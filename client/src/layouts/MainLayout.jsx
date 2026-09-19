import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-main selection:bg-primary-light selection:text-primary-dark">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;
