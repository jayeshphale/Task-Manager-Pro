import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock } from "lucide-react";

import useAuth from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/ui/AuthCard";
import FloatingInput from "../components/ui/FloatingInput";
import Button from "../components/ui/Button";

const Signup = () => {

  const navigate = useNavigate();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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

    const success = await signup(formData);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout
      headline="Create your premium workflow hub."
      subheading="Sign up to organize tasks, streamline approvals, and manage work with enterprise polish."
    >
      <AuthCard
        title="Create account"
        subtitle="Register now and begin organizing your work like a pro."
        footer={
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white transition hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        }
      >
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-center text-sm text-slate-400">
          Start with instant access to secure team productivity.
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput
            id="signup-name"
            name="name"
            type="text"
            label="Full name"
            icon={UserPlus}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FloatingInput
            id="signup-email"
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
            id="signup-password"
            name="password"
            type="password"
            label="Password"
            icon={Lock}
            showPasswordToggle
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            helperText="Use at least 8 characters with a mix of letters and numbers."
            required
          />

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-[1.75rem] bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20"
          >
            Create account
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;