export default function Sidebar ({ active, setPage }) {
    const menu = [
        "Dashboard",
        "Profile",
        "Create Post",
        "Analytics",
        "Rankings",
        "Trending",
        "Messages",
        "Verification",
        "Settings"                      
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-title">Startup Account</div>

            {menu.map(item => (
                <div
                    key={item}
                    className={`sidebar-item ${active === item ? "active" : ""}`}
                    onClick={() => setPage(item)}
                >
                    {item}
                </div>    
            ))}

            <div className="sidebar-logout">Log out</div>
        </aside>
    );
}