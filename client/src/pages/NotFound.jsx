import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-primary-light text-primary flex items-center justify-center mb-6">
        <span className="text-3xl font-bold">404</span>
      </div>
      <h1 className="text-3xl font-bold text-text-main mb-2">Page Not Found</h1>
      <p className="text-text-secondary max-w-md mb-8 text-sm">
        The property or page you are looking for might have been moved, deleted, or is temporarily unavailable.
      </p>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-surface text-text-main font-medium text-sm hover:bg-black/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Properties</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
