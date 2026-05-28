import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap } from "lucide-react";
import GradientBackground from "../components/ui/GradientBackground";

const bulletItems = [
  {
    icon: ShieldCheck,
    label: "Enterprise-ready security",
    detail: "Built with secure auth, role controls, and privacy-first design."
  },
  {
    icon: Users,
    label: "Team workflows simplified",
    detail: "Invite stakeholders, manage tasks, and stay aligned in one place."
  },
  {
    icon: Zap,
    label: "Fast setup, instant clarity",
    detail: "Launch quickly with a clean, professional interface."
  }
];

const AuthLayout = ({ children, headline, subheading, prompt }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <GradientBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="grid min-h-screen gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-12 lg:py-12">
          <aside className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_30%)]" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-3xl bg-fuchsia-500/15 blur-3xl" />
            <div className="relative z-10 space-y-10">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/90 shadow-sm shadow-cyan-500/10">
                Premium SaaS experience
              </div>
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">Task Manager Pro</p>
                <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {headline}
                </h2>
                <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                  {subheading}
                </p>
              </div>

              <div className="grid gap-4">
                {bulletItems.map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{label}</p>
                        <p className="mt-1 text-sm text-slate-400">{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-inner shadow-slate-950/10">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Why teams choose it</p>
                <div className="mt-4 space-y-3 text-slate-300">
                  <p className="text-sm leading-7">A clean, thoughtful experience designed to help you stay productive without distraction.</p>
                  <p className="text-sm leading-7">Beautifully balanced visuals, simple workflows, and premium polish across desktop and mobile.</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex items-center justify-center">
            <div className="w-full max-w-lg">
              {children}
              {prompt && <p className="mt-6 text-center text-sm text-slate-400">{prompt}</p>}
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
