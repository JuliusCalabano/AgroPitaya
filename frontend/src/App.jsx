import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Sidebar } from "./components/common/Sidebar";
import { Topbar } from "./components/common/Topbar";
import { ToastContainer } from "./components/common/UI";

// Public pages
import { HomePage, AboutPage, FeaturesPage, LoginPage, RegisterPage } from "./pages/PublicPages";
// App pages
import { DashboardPage } from "./pages/DashboardPage";
import { FarmsPage } from "./pages/FarmsPage";
import { SensorsPage } from "./pages/SensorsPage";
import { IrrigationPage } from "./pages/IrrigationPage";
import { WeatherPage, AlertsPage, AnalyticsPage, ReportsPage } from "./pages/MonitoringPages";
import { AdminPage, ProfilePage, ContactPage } from "./pages/AdminProfilePages";

const publicPages = new Set(["home", "about", "features", "login", "register"]);

const AppContent = () => {
  const { currentPage, isAuthenticated, toasts, sidebarOpen } = useApp();


  const isPublic = publicPages.has(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      // Public
      case "home": return <HomePage />;
      case "about": return <AboutPage />;
      case "features": return <FeaturesPage />;
      case "login": return <LoginPage />;
      case "register": return <RegisterPage />;
      // Protected
      case "dashboard": return <DashboardPage />;
      case "farms": return <FarmsPage />;
      case "sensors": return <SensorsPage />;
      case "irrigation": return <IrrigationPage />;
      case "weather": return <WeatherPage />;
      case "alerts": return <AlertsPage />;
      case "analytics": return <AnalyticsPage />;
      case "reports": return <ReportsPage />;
      case "admin": return <AdminPage />;
      case "profile": return <ProfilePage />;
      case "contact": return <ContactPage />;
      default: return <DashboardPage />;
    }
  };

  // If not authenticated and trying to access a protected page, redirect to home
  /* if (!isAuthenticated && !isPublic) { */
  if (!isAuthenticated && !isPublic) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {isPublic ? (
        renderPage()
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
            <Topbar />
            <main className="flex-1 overflow-y-auto pt-16">
              <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                {renderPage()}
              </div>
            </main>
          </div>
        </div>
      )}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
