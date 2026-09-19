import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Loader2,
  KeyRound,
  Home,
} from "lucide-react";
import { register as registerThunk } from "../features/auth/authThunks";
import { clearError } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "User", // "User" or "Owner"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) dispatch(clearError());
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const user = await dispatch(registerThunk(formData)).unwrap();
      toast.success(`Account created! Welcome, ${user.firstName}!`);
      if (user.role === "Owner") {
        navigate("/owner");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err || "Registration failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        {/* Card */}
        <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-border shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              Join Samsar
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Find your next Moroccan dream home or manage your rental properties
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-error/30 text-error text-xs font-medium">
                {error}
              </div>
            )}

            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-2">
                I am joining as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("User")}
                  className={`flex flex-col items-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    formData.role === "User"
                      ? "border-primary bg-primary-light/30 text-primary-dark shadow-xs font-semibold"
                      : "border-border bg-background/50 text-text-secondary hover:border-primary/40"
                  }`}
                >
                  <Home className={`w-5 h-5 mb-1 ${formData.role === "User" ? "text-primary" : "text-text-secondary"}`} />
                  <span className="text-sm font-semibold">Tenant / Renter</span>
                  <span className="text-[11px] text-text-secondary mt-0.5">Looking to rent</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("Owner")}
                  className={`flex flex-col items-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    formData.role === "Owner"
                      ? "border-primary bg-primary-light/30 text-primary-dark shadow-xs font-semibold"
                      : "border-border bg-background/50 text-text-secondary hover:border-primary/40"
                  }`}
                >
                  <KeyRound className={`w-5 h-5 mb-1 ${formData.role === "Owner" ? "text-primary" : "text-text-secondary"}`} />
                  <span className="text-sm font-semibold">Property Owner</span>
                  <span className="text-[11px] text-text-secondary mt-0.5">Listing properties</span>
                </button>
              </div>
            </div>

            {/* Name Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-1.5">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Karim"
                    className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-1.5">
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Benmansour"
                    className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="karim@example.ma"
                  className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-1.5">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6 00 00 00 00"
                  className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-1.5">
                Password * (min 8 characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-4 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create {formData.role} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-6 text-center text-xs text-text-secondary border-t border-border/80 pt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary-dark underline-offset-2 hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
