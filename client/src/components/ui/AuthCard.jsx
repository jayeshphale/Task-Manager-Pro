import { motion } from "framer-motion";

const AuthCard = ({ title, subtitle, children, footer, className = "", ...props }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative overflow-hidden w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-10 ${className}`}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" />
      <div className="space-y-4 pb-6 pt-4 text-center sm:pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/90">Secure access</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mx-auto max-w-xl text-sm text-slate-400 sm:text-base">{subtitle}</p>
      </div>
      <div className="space-y-6">{children}</div>
      {footer && <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">{footer}</div>}
    </motion.section>
  );
};

export default AuthCard;
