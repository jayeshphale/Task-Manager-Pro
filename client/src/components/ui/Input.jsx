const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${className}`}
    />
  );
};

export default Input;
