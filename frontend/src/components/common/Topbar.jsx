import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Icon, Badge } from "./UI";

export const Topbar = () => {
  const { sidebarOpen, setSidebarOpen, darkMode, setDarkMode, unreadAlerts, navigate, user, currentPage } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pageTitles = {
    dashboard: "Dashboard", farms: "Farm Management", sensors: "Sensor Monitoring",
    irrigation: "Irrigation Control", weather: "Weather Monitor", alerts: "Alerts Center",
    analytics: "Analytics", reports: "Reports", admin: "Admin Panel", profile: "Profile", contact: "Contact",
  };

  return (
    <header className="fixed top-0 right-0 z-20 h-16 flex items-center justify-between px-4 lg:px-6 border-b border-white/5 bg-gray-950/80 backdrop-blur-md transition-all duration-300" style={{ left: sidebarOpen ? "256px" : "80px" }}>
      {/* Left: menu toggle + breadcrumb */}
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-colors">
          <Icon name="menu" size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-white/30">AgroPitaya</span>
          <span className="text-white/20">/</span>
          <span className="text-white/80 font-medium">{pageTitles[currentPage] || currentPage}</span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          title="Toggle theme"
        >
          <Icon name={darkMode ? "sun" : "moon"} size={18} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate("alerts")}
          className="relative p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <Icon name="bell" size={18} />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
              {unreadAlerts}
            </span>
          )}
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.[0] || "A"}
            </div>
            <span className="hidden sm:block text-sm text-white/70 font-medium">{user?.name?.split(" ")[0] || "Admin"}</span>
            <Icon name="chevron_down" size={14} className="hidden sm:block text-white/30" />
          </button>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5">
                  <div className="text-sm font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-white/40 capitalize">{user?.role}</div>
                </div>
                {[
                  { label: "Profile", page: "profile", icon: "user" },
                  { label: "Settings", page: "profile", icon: "settings" },
                  { label: "Admin Panel", page: "admin", icon: "shield" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.page); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Icon name={item.icon} size={16} />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-white/5 mt-1">
                  <button
                    onClick={() => { setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Icon name="logout" size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
