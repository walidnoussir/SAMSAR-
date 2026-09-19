import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Compass, Heart, Calendar, User, LayoutDashboard } from "lucide-react";

const MobileBottomNav = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorites);

  const isOwner = user?.role === "Owner";

  const navItemClasses = ({ isActive }) =>
    `flex flex-col items-center justify-center py-2 px-1 text-[11px] font-medium transition-colors relative min-w-[56px] min-h-[44px] ${
      isActive ? "text-primary font-semibold" : "text-text-secondary hover:text-text-main"
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {/* 1. Home */}
        <NavLink to="/" className={navItemClasses} end>
          <Home className="w-5 h-5 mb-1" />
          <span>Home</span>
        </NavLink>

        {/* 2. Explore */}
        <NavLink to="/properties" className={navItemClasses}>
          <Compass className="w-5 h-5 mb-1" />
          <span>Explore</span>
        </NavLink>

        {/* 3. Favorites / Add Property */}
        {isOwner ? (
          <NavLink to="/owner/properties/new" className={navItemClasses}>
            <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
              <span className="text-base font-bold leading-none">+</span>
            </div>
            <span>New</span>
          </NavLink>
        ) : (
          <NavLink to={isAuthenticated ? "/favorites" : "/login"} className={navItemClasses}>
            <div className="relative">
              <Heart className="w-5 h-5 mb-1" />
              {favorites && favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-accent text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </div>
            <span>Favorites</span>
          </NavLink>
        )}

        {/* 4. Bookings / Dashboard */}
        {isOwner ? (
          <NavLink to="/owner" className={navItemClasses}>
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span>Dashboard</span>
          </NavLink>
        ) : (
          <NavLink to={isAuthenticated ? "/reservations" : "/login"} className={navItemClasses}>
            <Calendar className="w-5 h-5 mb-1" />
            <span>Bookings</span>
          </NavLink>
        )}

        {/* 5. Profile / Account */}
        <NavLink
          to={isAuthenticated ? (isOwner ? "/owner" : "/reservations") : "/login"}
          className={navItemClasses}
        >
          <User className="w-5 h-5 mb-1" />
          <span>{isAuthenticated ? user?.firstName?.slice(0, 7) || "Profile" : "Profile"}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
