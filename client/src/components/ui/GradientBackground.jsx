import { motion } from "framer-motion";

const GradientBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.8, y: -40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.2, x: 20, scale: 0.9 }}
        animate={{ opacity: 0.9, x: 0, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute right-0 top-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.15, y: 20 }}
        animate={{ opacity: 0.8, y: -20 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent" />
    </div>
  );
};

export default GradientBackground;
