import React from "react";
import { useApp } from "../../context/AppContext";
import { Icon, Badge } from "./UI";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "home", group: "main" },
  { id: "farms", label: "Farm Management", icon: "farm", group: "main" },
  { id: "sensors", label: "Sensor Monitoring", icon: "sensor", group: "monitoring" },
  { id: "irrigation", label: "Irrigation Control", icon: "droplet", group: "monitoring" },
  { id: "weather", label: "Weather Monitor", icon: "cloud", group: "monitoring" },
  { id: "alerts", label: "Alerts Center", icon: "bell", group: "monitoring", badge: true },
  { id: "analytics", label: "Analytics", icon: "chart", group: "insights" },
  { id: "reports", label: "Reports", icon: "report", group: "insights" },
  { id: "admin", label: "Admin Panel", icon: "shield", group: "admin", adminOnly: true },
  { id: "profile", label: "Profile", icon: "user", group: "account" },
  { id: "contact", label: "Contact", icon: "phone", group: "account" },
];

const groups = {
  main: "Main",
  monitoring: "Monitoring",
  insights: "Insights",
  admin: "Administration",
  account: "Account",
};

export const Sidebar = () => {
  const { currentPage, navigate, user, logout, unreadAlerts, sidebarOpen, setSidebarOpen, darkMode } = useApp();

  const visibleItems = navItems.filter((item) => !item.adminOnly || user?.role === "admin");
  const groupedItems = Object.entries(groups).map(([key, label]) => ({
    key,
    label,
    items: visibleItems.filter((i) => i.group === key),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 bottom-0 z-30 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 lg:w-20"} bg-gray-950 border-r border-white/5 overflow-hidden`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shrink-0">
            <Icon name="leaf" size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="text-white font-bold text-base leading-tight whitespace-nowrap">AgroPitaya</div>
              <div className="text-teal-400 text-xs whitespace-nowrap">IoT Platform</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
          {groupedItems.map((group) => (
            <div key={group.key} className="mb-2">
              {sidebarOpen && (
                <div className="px-4 py-1 text-xs font-semibold text-white/20 uppercase tracking-wider">{group.label}</div>
              )}
              {group.items.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.id); if (window.innerWidth < 1024) setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-200 text-left group relative ${isActive ? "bg-teal-500/15 text-teal-400" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
                    style={{ width: sidebarOpen ? "calc(100% - 16px)" : "calc(100% - 16px)" }}
                  >
                    <span className="shrink-0">
                      <Icon name={item.icon} size={18} />
                    </span>
                    {sidebarOpen && (
                      <>
                        <span className="text-sm font-medium whitespace-nowrap flex-1">{item.label}</span>
                        {item.badge && unreadAlerts > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{unreadAlerts}</span>
                        )}
                      </>
                    )}
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-400 rounded-r-full" />}
                    {!sidebarOpen && item.badge && unreadAlerts > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-white/5 shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user?.name?.[0] || "A"}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-medium text-white truncate">{user?.name || "Admin"}</div>
                <div className="text-xs text-white/40 truncate capitalize">{user?.role || "admin"}</div>
              </div>
              <button onClick={logout} className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Icon name="logout" size={14} />
              </button>
            </div>
          ) : (
            <button onClick={logout} className="w-full flex justify-center p-2.5 rounded-xl hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors">
              <Icon name="logout" size={18} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
