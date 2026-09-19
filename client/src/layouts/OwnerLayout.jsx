import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Building2,
  LayoutDashboard,
  ArrowLeftRight,
  LogOut,
  PlusCircle,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { logout } from "../features/auth/authThunks";
import toast from "react-hot-toast";

const OwnerLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error(err || "Logout failed");
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
      isActive
        ? "bg-primary-light/40 text-primary font-semibold"
        : "text-text-secondary hover:text-text-main hover:bg-black/5"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-main">
      {/* Owner Top Header */}
      <header className="sticky top-0 z-40 bg-surface border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand + Portal Badge */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-text-main">
                  Samsar
                </span>
              </Link>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light/50 border border-primary/20 text-xs font-semibold text-primary-dark">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>OWNER PORTAL</span>
              </div>
            </div>

            {/* Middle: Owner Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/owner" end className={navLinkClasses}>
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/owner/properties" className={navLinkClasses}>
                <Building2 className="w-4 h-4" />
                <span>My Properties</span>
              </NavLink>

              <NavLink to="/owner/properties/new" className={navLinkClasses}>
                <PlusCircle className="w-4 h-4" />
                <span>Add Property</span>
              </NavLink>
            </nav>

            {/* Right: Switch to Tenant View + Notifications + Profile */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-background hover:bg-black/5 text-xs font-medium text-text-main transition-colors"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-primary" />
                <span>Switch to Tenant View</span>
              </Link>

              {/* Profile Card */}
              <div className="flex items-center gap-3 pl-2 border-l border-border">
                <div className="w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm overflow-hidden border border-border">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-text-main leading-tight">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-[10px] text-primary-dark flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                    Verified Owner
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 text-text-secondary hover:text-error rounded-lg hover:bg-black/5 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-text-main hover:bg-black/5"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface px-4 py-3 space-y-2 animate-in slide-in-from-top-2 shadow-lg">
            <NavLink
              to="/owner"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20"
            >
              <LayoutDashboard className="w-4 h-4 text-primary" />
              Dashboard
            </NavLink>
            <NavLink
              to="/owner/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20"
            >
              <Building2 className="w-4 h-4 text-primary" />
              My Properties
            </NavLink>
            <NavLink
              to="/owner/properties/new"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20"
            >
              <PlusCircle className="w-4 h-4 text-primary" />
              Add New Property
            </NavLink>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20"
            >
              <ArrowLeftRight className="w-4 h-4 text-primary" />
              Switch to Tenant View
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-error hover:bg-red-50 text-left"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
