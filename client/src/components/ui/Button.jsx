import { motion } from "framer-motion";

const VARIANT_CLASSES = {
  default: "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20",
  ghost: "bg-transparent text-white border border-white/10",
  destructive: "bg-red-600 text-white",
};

const SIZE_CLASSES = {
  sm: "px-3 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-3xl",
  lg: "px-8 py-4 text-base rounded-3xl",
};

const Button = ({
  children,
  loading = false,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const variantCls = VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;
  const sizeCls = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`inline-flex items-center justify-center gap-3 font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:pointer-events-none disabled:opacity-50 ${variantCls} ${sizeCls} ${className}`}
      disabled={loading || props.disabled}
    >
      {loading && <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />}
      {children}
    </motion.button>
  );
};

export default Button;
