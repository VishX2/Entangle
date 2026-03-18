/**
 * Basic PII/sensitive data detection for live content monitoring.
 * Returns warnings if potentially sensitive patterns are found.
 */
const PATTERNS = [
  { name: 'Credit card', regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, message: 'Possible credit card number detected' },
  { name: 'SSN', regex: /\b\d{3}-\d{2}-\d{4}\b/, message: 'Possible SSN format detected' },
  { name: 'Full name with title', regex: /\b(Dr|Mr|Mrs|Ms|Prof)\.\s+[\w\s]+\b/gi, message: 'Consider using initials for privacy' },
  { name: 'Email', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, message: 'Personal email detected - consider using business contact' },
  { name: 'Phone', regex: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/, message: 'Phone number detected - ensure it is appropriate to share' },
];

function scan(text) {
  if (!text || typeof text !== 'string') return { safe: true, warnings: [] };
  const warnings = [];
  for (const { name, regex, message } of PATTERNS) {
    const matches = text.match(regex);
    if (matches) {
      warnings.push({ type: name, message, count: matches.length });
    }
  }
  return {
    safe: warnings.length === 0,
    warnings,
  };
}

module.exports = { scan };
