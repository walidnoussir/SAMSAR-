import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ShieldCheck,
  Star,
  ArrowRight,
  Key,
  Compass,
  Sparkles,
} from "lucide-react";
import { getProperties } from "../features/properties/propertyThunks";
import PropertyCard from "../components/PropertyCard";
import { getFavorites } from "../features/favorites/favoriteThunks";

const CITIES = [
  {
    name: "Marrakech",
    subtitle: "Imperial charm & lush gardens",
    count: "542 homes",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Casablanca",
    subtitle: "Modern coastal living & business hubs",
    count: "618 homes",
    image:
      "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rabat",
    subtitle: "Serene coastal & historic tranquility",
    count: "212 homes",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tangier",
    subtitle: "Strait views & Mediterranean breeze",
    count: "154 homes",
    image:
      "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Agadir",
    subtitle: "Gold beaches & year-round climate",
    count: "86 homes",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.properties);

  const [selectedType, setSelectedType] = useState("All");
  const [cityInput, setCityInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    // Fetch latest 4 properties for featured section
    dispatch(getProperties({ limit: 4, sort: "newest" }));
  }, [dispatch]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (cityInput) params.set("city", cityInput);
    if (typeInput && typeInput !== "All") params.set("propertyType", typeInput);
    if (priceInput) {
      if (priceInput === "budget") params.set("maxPrice", "5000");
      if (priceInput === "mid") {
        params.set("minPrice", "5000");
        params.set("maxPrice", "12000");
      }
      if (priceInput === "luxury") params.set("minPrice", "12000");
    }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light/50 border border-primary/20 text-xs font-semibold text-primary-dark">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>MOROCCO'S PREMIER HIGH-TRUST RENTAL PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.15]">
              Find a place <br className="hidden sm:inline" />
              you'll <span className="text-primary">love.</span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              Discover comfortable homes and apartments for rent across Morocco.
              Verified direct owners, honest pricing in MAD, and zero booking
              friction.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-2 pb-2 border-y border-border/80 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-text-main block">
                  1,450+
                </span>
                <span className="text-xs text-text-secondary">
                  Verified Homes
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-text-main block">
                  5 Cities
                </span>
                <span className="text-xs text-text-secondary">
                  Kingdom-Wide
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-primary block">
                  0% Fee
                </span>
                <span className="text-xs text-text-secondary">
                  No Broker Markups
                </span>
              </div>
            </div>

            {/* Search Floating Card */}
            <div className="bg-surface p-4 sm:p-5 rounded-3xl border border-border shadow-lg space-y-4">
              {/* Type selector tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {["All", "Apartment", "Villa", "House", "Studio"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setSelectedType(t);
                      setTypeInput(t === "All" ? "" : t);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedType === t
                        ? "bg-primary text-white"
                        : "bg-background text-text-secondary hover:text-text-main"
                    }`}
                  >
                    {t === "House" ? "Riad" : t}
                  </button>
                ))}
              </div>

              {/* Form inputs */}
              <form
                onSubmit={handleHeroSearch}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
              >
                {/* Location */}
                <div className="p-2.5 rounded-2xl bg-background border border-border focus-within:border-primary">
                  <span className="text-[10px] uppercase font-bold text-text-secondary block">
                    Location
                  </span>
                  <select
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-text-main focus:outline-none pt-0.5 cursor-pointer"
                  >
                    <option value="">Where to live?</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                  </select>
                </div>

                {/* Monthly Budget */}
                <div className="p-2.5 rounded-2xl bg-background border border-border focus-within:border-primary">
                  <span className="text-[10px] uppercase font-bold text-text-secondary block">
                    Monthly Budget
                  </span>
                  <select
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-text-main focus:outline-none pt-0.5 cursor-pointer"
                  >
                    <option value="">Any Budget</option>
                    <option value="budget">Under 5,000 MAD</option>
                    <option value="mid">5,000 - 12,000 MAD</option>
                    <option value="luxury">12,000+ MAD</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Hero Visual (Riad with pool & floating review) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border-4 border-surface">
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85"
                alt="Moroccan Riad courtyard with swimming pool"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 right-4 bg-accent text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Verified</span>
              </div>

              {/* Bottom Testimonial Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl space-y-1.5">
                <div className="flex items-center gap-1 text-accent">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-accent" />
                  ))}
                  <span className="text-xs font-bold text-text-main ml-1">
                    5.0
                  </span>
                </div>
                <p className="text-xs text-text-main font-medium italic">
                  "Transparent, safe, and found my rental Riad in Gueliz in
                  under 48 hours."
                </p>
                <p className="text-[11px] text-text-secondary">
                  Yassine B. —{" "}
                  <span className="text-primary font-semibold">
                    Verified Tenant
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE POPULAR CITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
              Discover Morocco
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main">
              Explore popular cities
            </h2>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark"
          >
            <span>View all regions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cities Grid (3 top, 2 bottom matching image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.slice(0, 3).map((c) => (
            <Link
              key={c.name}
              to={`/properties?city=${c.name}`}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                {c.count}
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{c.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {CITIES.slice(3, 5).map((c) => (
            <Link
              key={c.name}
              to={`/properties?city=${c.name}`}
              className="group relative aspect-[16/9] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                {c.count}
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{c.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
              Curated Selections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main">
              Featured & Popular Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark"
          >
            <span>Explore all listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-surface rounded-3xl border border-border p-4 animate-pulse space-y-3"
              >
                <div className="bg-slate-200 aspect-[4/3] rounded-2xl w-full" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="p-12 text-center bg-surface rounded-3xl border border-border space-y-3">
            <p className="text-text-secondary text-sm">
              No properties listed yet.
            </p>
            <Link
              to="/properties"
              className="inline-block text-xs font-bold text-primary"
            >
              Browse All Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.slice(0, 4).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE SAMSAR? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
            Built For Moroccans & Expats
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-main">
            Why choose Samsar?
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            We combine local residential nuance with modern digital standards to
            make renting in Morocco swift, direct, and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs hover:border-primary/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-text-main">
              Verified Property Listings
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every listing is reviewed and documentation is checked for
              absolute peace of mind before reservation.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs hover:border-primary/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary">MAD</span>
            </div>
            <h3 className="text-base font-bold text-text-main">
              Transparent MAD Pricing
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              No arbitrary intermediary markups or unexpected fees. Direct owner
              rates stipulated clearly upfront.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs hover:border-primary/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-text-main">
              Direct Owner Reservations
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Message verified property hosts directly, schedule private visits,
              and secure your next rental in minutes.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs hover:border-primary/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-text-main">
              Interactive Map Search
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Explore nearby tramway stops, local souks, international schools,
              cafés, and beach access with visual precision.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER (Matching image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] bg-[#1E3A34] text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Subtle decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/40 border border-primary/40 text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
              Fast & Fully Verified
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your next home is waiting.
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Join thousands of tenants and verified Moroccan property owners.
              Fast, transparent, and built with genuine local hospitality.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                to="/properties"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-md text-center transition-colors"
              >
                Explore All Properties
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-text-main font-semibold text-sm hover:bg-white/90 text-center transition-colors"
              >
                List Your Property as Owner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
