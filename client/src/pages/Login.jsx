import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Building2, Mail, Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { clearError } from "../features/auth/authSlice";
import { login as loginThunk } from "../features/auth/authThunks";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const user = await dispatch(loginThunk(formData)).unwrap();
      toast.success(`Welcome back, ${user.firstName}!`);
      if (user.role === "Owner") {
        navigate("/owner");
      } else {
        navigate(from === "/login" ? "/" : from, { replace: true });
      }
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-border shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Sign in to manage your bookings, favorites, or rental listings
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-error/30 text-error text-xs font-medium">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-text-main mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-text-main"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3.5 py-3 rounded-xl border border-border bg-background/50 text-sm text-text-main placeholder:text-text-secondary/60 focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-8 text-center text-xs text-text-secondary border-t border-border/80 pt-6">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:text-primary-dark underline-offset-2 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Guarantee footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-text-secondary">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Secure HttpOnly 256-bit encrypted authentication</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
