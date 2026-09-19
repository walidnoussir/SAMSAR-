import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Building2,
  Heart,
  Calendar,
  LogOut,
  Menu,
  X,
  Compass,
  PlusCircle,
  LayoutDashboard,
  Home as HomeIcon,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { logout } from "../features/auth/authThunks";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorites);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      setIsProfileDropdownOpen(false);
      navigate("/");
    } catch (err) {
      toast.error(err || "Logout failed");
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
      isActive
        ? "text-primary font-semibold bg-primary-light/30"
        : "text-text-main hover:text-primary hover:bg-black/5"
    }`;

  const isOwner = user?.role === "Owner";

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-text-main group-hover:text-primary transition-colors">
                Samsar
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            <NavLink to="/" className={navLinkClasses} end>
              Home
            </NavLink>
            <NavLink to="/properties" className={navLinkClasses}>
              Properties
            </NavLink>
            <NavLink to="/properties?view=map" className={navLinkClasses}>
              Explore Map
            </NavLink>
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Switch Role or Owner Links */}
                {isOwner ? (
                  <Link
                    to="/owner"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary text-xs font-semibold text-primary hover:bg-primary-light/30 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Owner Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/reservations"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-main hover:text-primary px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-primary" />
                    My Reservations
                  </Link>
                )}

                {/* Favorites icon for Users */}
                {!isOwner && (
                  <Link
                    to="/favorites"
                    aria-label="Favorites"
                    className="relative p-2 text-text-main hover:text-primary rounded-full hover:bg-black/5 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    {favorites && favorites.length > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-accent text-white rounded-full flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full border border-border hover:border-primary/50 transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-semibold text-xs overflow-hidden">
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
                    <span className="text-xs font-medium text-text-main max-w-[100px] truncate hidden lg:inline">
                      {user?.firstName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-text-secondary mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-surface rounded-2xl shadow-xl border border-border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-border/60">
                        <p className="text-xs text-text-secondary font-medium">Signed in as</p>
                        <p className="text-sm font-semibold text-text-main truncate">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary-light text-primary-dark">
                          <ShieldCheck className="w-3 h-3" />
                          {user?.role} Account
                        </span>
                      </div>

                      {isOwner ? (
                        <>
                          <Link
                            to="/owner"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-main hover:bg-primary-light/20 hover:text-primary transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-primary" />
                            Dashboard
                          </Link>
                          <Link
                            to="/owner/properties"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-main hover:bg-primary-light/20 hover:text-primary transition-colors"
                          >
                            <Building2 className="w-4 h-4 text-primary" />
                            My Properties
                          </Link>
                          <Link
                            to="/owner/properties/new"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-main hover:bg-primary-light/20 hover:text-primary transition-colors"
                          >
                            <PlusCircle className="w-4 h-4 text-primary" />
                            Add New Property
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/reservations"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-main hover:bg-primary-light/20 hover:text-primary transition-colors"
                          >
                            <Calendar className="w-4 h-4 text-primary" />
                            My Reservations
                          </Link>
                          <Link
                            to="/favorites"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-main hover:bg-primary-light/20 hover:text-primary transition-colors"
                          >
                            <Heart className="w-4 h-4 text-primary" />
                            Favorites
                          </Link>
                        </>
                      )}

                      <div className="border-t border-border/60 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-text-main hover:text-primary px-3.5 py-2 rounded-xl hover:bg-black/5 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center text-sm font-medium text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {!isOwner && isAuthenticated && (
              <Link
                to="/favorites"
                aria-label="Favorites"
                className="relative p-2 text-text-main"
              >
                <Heart className="w-6 h-6" />
                {favorites && favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-accent text-white rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-text-main hover:bg-black/5 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20 hover:text-primary"
            >
              <HomeIcon className="w-4 h-4 text-primary" />
              Home
            </Link>
            <Link
              to="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20 hover:text-primary"
            >
              <Building2 className="w-4 h-4 text-primary" />
              Browse Properties
            </Link>
            <Link
              to="/properties?view=map"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-main hover:bg-primary-light/20 hover:text-primary"
            >
              <Compass className="w-4 h-4 text-primary" />
              Explore on Map
            </Link>
          </nav>

          <div className="border-t border-border pt-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-background rounded-xl">
                  <p className="text-xs text-text-secondary">Logged in as</p>
                  <p className="text-sm font-semibold text-text-main">
                    {user?.firstName} {user?.lastName} ({user?.role})
                  </p>
                </div>

                {isOwner ? (
                  <>
                    <Link
                      to="/owner"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-text-main rounded-xl hover:bg-primary-light/20"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      Owner Dashboard
                    </Link>
                    <Link
                      to="/owner/properties"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-text-main rounded-xl hover:bg-primary-light/20"
                    >
                      <Building2 className="w-4 h-4 text-primary" />
                      My Properties
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/reservations"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-text-main rounded-xl hover:bg-primary-light/20"
                    >
                      <Calendar className="w-4 h-4 text-primary" />
                      My Reservations
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-text-main rounded-xl hover:bg-primary-light/20"
                    >
                      <Heart className="w-4 h-4 text-primary" />
                      My Favorites
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-error rounded-xl hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-medium text-text-main bg-background rounded-xl border border-border"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-medium text-white bg-primary rounded-xl"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
