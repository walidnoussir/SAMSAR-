import React from "react";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#F0F7F5] border-t border-border mt-auto pt-16 pb-12 text-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-text-main">
                Samsar
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Morocco's premier high-trust rental ecosystem connecting verified owners and
              selective tenants with full transparency.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs text-primary-dark font-medium shadow-xs">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Moroccan Real Estate Guarantee Certified</span>
            </div>
          </div>

          {/* Col 1: Popular Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main mb-4">
              Popular Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/properties?city=Casablanca" className="hover:text-primary transition-colors">
                  Casablanca
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Marrakech" className="hover:text-primary transition-colors">
                  Marrakech
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Rabat" className="hover:text-primary transition-colors">
                  Rabat
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Tangier" className="hover:text-primary transition-colors">
                  Tangier
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Agadir" className="hover:text-primary transition-colors">
                  Agadir
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Property Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main mb-4">
              Property Types
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/properties?propertyType=Apartment" className="hover:text-primary transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Villa" className="hover:text-primary transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=House" className="hover:text-primary transition-colors">
                  Traditional Riads & Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Studio" className="hover:text-primary transition-colors">
                  Studios
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Room" className="hover:text-primary transition-colors">
                  Private Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-main mb-4">
              Tenants & Owners
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/properties" className="hover:text-primary transition-colors">
                  Find a Rental
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <span className="text-text-secondary/80">Rental Guarantee</span>
              </li>
              <li>
                <span className="text-text-secondary/80">Verified Inspections</span>
              </li>
              <li>
                <span className="text-text-secondary/80">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© 2026 Samsar Technologies SARL. All rights reserved. Made with pride in Morocco.</p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Français (FR) / English • MAD (Moroccan Dirham)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
