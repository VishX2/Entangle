-- =====================================================
-- ENTABLE PLATFORM - SIMPLE TRUSTPILOT-LIKE DATABASE
-- For entrepreneurs, investors, and startups
-- =====================================================

-- Drop tables if they exist (for clean installation)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =====================================================
-- 1. CREATE ENUM TYPES
-- =====================================================
CREATE TYPE company_type AS ENUM ('entrepreneur', 'investor', 'startup');

-- =====================================================
-- 2. ROLES TABLE
-- =====================================================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('admin', 'Full access to manage companies, users, and content'),
    ('user', 'Regular user who can view and write reviews');

-- =====================================================
-- 3. USERS TABLE (Single table for all users)
-- =====================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_picture TEXT,
    role_id INTEGER REFERENCES roles(id) DEFAULT 2, -- Default to 'user' role
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. COMPANIES TABLE (Main entities being reviewed)
-- =====================================================
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_type company_type NOT NULL,
    description TEXT,
    logo_url TEXT,
    website_url VARCHAR(500),
    headquarters VARCHAR(255),
    founded_year INTEGER,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Entrepreneur specific fields
    founder_name VARCHAR(255),
    years_experience INTEGER,
    
    -- Investor specific fields
    investment_focus TEXT,
    min_investment DECIMAL(15,2),
    max_investment DECIMAL(15,2),
    
    -- Startup specific fields
    funding_stage VARCHAR(100),
    team_size INTEGER,
    
    -- Metrics (auto-updated)
    total_reviews INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    
    -- Audit fields (references users table)
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. REVIEWS TABLE (Ratings and comments from users)
-- =====================================================
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    pros TEXT,
    cons TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 6. INDEXES (For faster queries)
-- =====================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_companies_type ON companies(company_type);
CREATE INDEX idx_companies_verified ON companies(is_verified);
CREATE INDEX idx_companies_rating ON companies(average_rating);
CREATE INDEX idx_companies_created_by ON companies(created_by);
CREATE INDEX idx_reviews_company ON reviews(company_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- =====================================================
-- 7. FUNCTION TO UPDATE COMPANY METRICS
-- =====================================================
CREATE OR REPLACE FUNCTION update_company_metrics()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE companies SET
        total_reviews = (SELECT COUNT(*) FROM reviews WHERE company_id = NEW.company_id),
        average_rating = COALESCE((SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE company_id = NEW.company_id), 0)
    WHERE id = NEW.company_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_company_metrics
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_company_metrics();

-- =====================================================
-- 8. FUNCTION TO UPDATE TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 9. INSERT SAMPLE DATA
-- =====================================================

-- Insert sample users (both admins and regular users)
-- Note: In production, use proper password hashing (bcrypt)
INSERT INTO users (email, password_hash, first_name, last_name, role_id) VALUES
    ('admin@entangle.com', '$2a$10$YourHashedPasswordHere', 'Super', 'Admin', 1),
    ('moderator@entangle.com', '$2a$10$YourHashedPasswordHere', 'Content', 'Moderator', 1),
    ('john@example.com', '$2a$10$YourHashedPasswordHere', 'John', 'Doe', 2),
    ('jane@example.com', '$2a$10$YourHashedPasswordHere', 'Jane', 'Smith', 2),
    ('bob@example.com', '$2a$10$YourHashedPasswordHere', 'Bob', 'Johnson', 2);

-- Insert sample companies (all three types)
INSERT INTO companies (
    name, 
    company_type, 
    description, 
    logo_url, 
    headquarters, 
    is_verified,
    -- Type specific fields
    founder_name,
    years_experience,
    investment_focus,
    min_investment,
    max_investment,
    funding_stage,
    team_size,
    created_by
) VALUES
    -- Entrepreneur
    (
        'Sarah Chen', 
        'entrepreneur', 
        'Serial entrepreneur with exits in fintech and e-commerce',
        'https://example.com/logos/sarah.jpg',
        'Stockholm, Sweden',
        TRUE,
        'Sarah Chen',
        12,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        1
    ),
    -- Investor
    (
        'Nordic Ventures', 
        'investor', 
        'Leading VC firm investing in Nordic startups',
        'https://example.com/logos/nordic.jpg',
        'Stockholm, Sweden',
        TRUE,
        NULL,
        NULL,
        'Fintech, SaaS, Green Tech',
        500000,
        5000000,
        NULL,
        NULL,
        1
    ),
    -- Startup
    (
        'GreenTech Solutions', 
        'startup', 
        'Sustainable energy solutions for urban environments',
        'https://example.com/logos/greentech.jpg',
        'Copenhagen, Denmark',
        FALSE,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Seed',
        8,
        1
    ),
    -- Another Entrepreneur
    (
        'Michael Eriksson', 
        'entrepreneur', 
        'Founder of multiple successful SaaS companies',
        'https://example.com/logos/michael.jpg',
        'Gothenburg, Sweden',
        TRUE,
        'Michael Eriksson',
        15,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        1
    ),
    -- Another Investor
    (
        'Stockholm Angel Network', 
        'investor', 
        'Network of angel investors backing early-stage startups',
        'https://example.com/logos/angel.jpg',
        'Stockholm, Sweden',
        TRUE,
        NULL,
        NULL,
        'Early-stage, Seed, Pre-seed',
        100000,
        1000000,
        NULL,
        NULL,
        1
    ),
    -- Another Startup
    (
        'HealthAI', 
        'startup', 
        'AI-powered diagnostic tools for healthcare providers',
        'https://example.com/logos/healthai.jpg',
        'Uppsala, Sweden',
        TRUE,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Series A',
        15,
        1
    );

-- Insert sample reviews
INSERT INTO reviews (company_id, user_id, title, content, rating, pros, cons) VALUES
    (1, 3, 'Great mentor', 'Sarah provided invaluable advice for my startup journey.', 5, 'Experienced, Generous with time', 'None'),
    (1, 4, 'Helpful connections', 'Introduced me to key investors in the region.', 4, 'Great network', 'Busy, takes time to respond'),
    (2, 3, 'Excellent partner', 'Nordic Ventures helped us scale our business.', 5, 'Professional team, Good terms', 'None'),
    (2, 5, 'Good experience', 'Smooth process and supportive throughout.', 4, 'Responsive', 'Slightly bureaucratic'),
    (3, 4, 'Innovative product', 'Their solution is exactly what we needed.', 5, 'Cutting-edge tech', 'Early stage'),
    (4, 5, 'Great entrepreneur', 'Michael has deep industry knowledge.', 5, 'Experienced, Strategic thinker', 'None'),
    (5, 3, 'Active investors', 'They really engage with founders.', 5, 'Hands-on approach', 'None'),
    (6, 4, 'Amazing technology', 'Their AI platform is impressive.', 5, 'Innovative, Strong team', 'None');

-- =====================================================
-- 10. VIEW FOR COMPANY SUMMARY
-- =====================================================
CREATE VIEW company_summary AS
SELECT 
    c.id,
    c.name,
    c.company_type,
    c.description,
    c.logo_url,
    c.headquarters,
    c.is_verified,
    c.total_reviews,
    c.average_rating,
    CASE 
        WHEN c.company_type = 'entrepreneur' THEN c.founder_name
        WHEN c.company_type = 'investor' THEN c.investment_focus
        WHEN c.company_type = 'startup' THEN c.funding_stage
    END AS type_specific_info,
    CONCAT(u.first_name, ' ', u.last_name) AS created_by_name
FROM companies c
LEFT JOIN users u ON c.created_by = u.id
WHERE c.is_active = TRUE
ORDER BY c.average_rating DESC;

-- =====================================================
-- 11. SAMPLE QUERIES FOR YOUR API
-- =====================================================

-- Get all companies with their ratings
-- SELECT * FROM company_summary;

-- Get companies by type (for filtering)
-- SELECT * FROM company_summary WHERE company_type = 'startup';
-- SELECT * FROM company_summary WHERE company_type = 'investor';
-- SELECT * FROM company_summary WHERE company_type = 'entrepreneur';

-- Get all reviews for a specific company (for company detail page)
-- SELECT r.*, u.first_name, u.last_name 
-- FROM reviews r
-- LEFT JOIN users u ON r.user_id = u.id
-- WHERE r.company_id = 2
-- ORDER BY r.created_at DESC;

-- Get top-rated verified companies
-- SELECT * FROM company_summary 
-- WHERE is_verified = TRUE 
-- ORDER BY average_rating DESC 
-- LIMIT 10;

-- Get all admins
-- SELECT * FROM users WHERE role_id = 1;

-- Get all regular users
-- SELECT * FROM users WHERE role_id = 2;

-- =====================================================
-- 12. ADMIN QUERIES (CRUD operations)
-- =====================================================

-- Create a new company (admin only - check role_id = 1 in app)
-- INSERT INTO companies (
--     name, company_type, description, logo_url, 
--     headquarters, founded_year, created_by
-- ) VALUES (
--     'New Startup', 'startup', 'Description', 'logo.jpg',
--     'Location', 2024, 1
-- ) RETURNING id;

-- Update a company (admin only)
-- UPDATE companies 
-- SET name = 'Updated Name', 
--     description = 'New description',
--     logo_url = 'new-logo.jpg',
--     updated_by = 1
-- WHERE id = 3;

-- Delete a company (admin only - soft delete by setting is_active = FALSE)
-- UPDATE companies SET is_active = FALSE, updated_by = 1 WHERE id = 3;

-- Hard delete (use with caution)
-- DELETE FROM companies WHERE id = 3;

-- =====================================================
-- 13. HELPER FUNCTIONS FOR AUTHENTICATION
-- =====================================================

-- Get user by email (for login)
-- SELECT id, email, password_hash, role_id FROM users WHERE email = 'user@example.com';

-- Get user role name
-- SELECT u.*, r.name as role_name 
-- FROM users u
-- JOIN roles r ON u.role_id = r.id
-- WHERE u.id = 1;

-- =====================================================
-- END OF SQL FILE
-- =====================================================