import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import { UserPlus, Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      console.log("Submitting registration form with data:", registerData);
      const data = await registerUser(registerData);
      console.log("Registration successful:", data);

      setAuth(data.user, data.token);

      toast.success(`Account created! Welcome, ${data.user.username}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((errorObj) => {
          
          const errorMessage = Object.values(errorObj)[0];
          toast.error(errorMessage);
        });
      }
      
      else if (err.message) {
        toast.error(err.message);
      }
     
      else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
            <UserPlus size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
        </div>

        <p className="text-slate-500 mb-8">
          Start managing your finances with role-based precision.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Username */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User size={16} /> Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="johndoe_dev"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="john@example.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Lock size={16} /> Confirm
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer md:col-span-2 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 mt-4 shadow-lg shadow-indigo-100"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-100"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400">
              Already a member?
            </span>
          </div>
        </div>

        <p className="text-center text-slate-600">
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline decoration-2 underline-offset-4"
          >
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
