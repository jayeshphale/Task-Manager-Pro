import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import useAuth from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/ui/AuthCard";
import FloatingInput from "../components/ui/FloatingInput";
import Button from "../components/ui/Button";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const success = await login(formData);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout
      headline="Sign in to a modern productivity experience."
      subheading="Secure access to your team dashboard, premium workflows, and real-time task insights."
    >
      <AuthCard
        title="Welcome back"
        subtitle="Enter your email and password to continue to TaskFlow."
        footer={
          <p className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-white transition hover:text-cyan-300">
              Create one
            </Link>
          </p>
        }
      >
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-center text-sm text-slate-400">
          Trusted by teams for fast, secure task management.
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput
            id="login-email"
            name="email"
            type="email"
            label="Email address"
            icon={Mail}
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="login-password"
            name="password"
            type="password"
            label="Password"
            icon={Lock}
            showPasswordToggle
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            helperText="Keep your account secure with a strong password."
            required
          />

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-[1.75rem] bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20"
          >
            Continue to dashboard
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;