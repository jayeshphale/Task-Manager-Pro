import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FloatingInput = ({
  id,
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  name,
  autoComplete,
  error,
  helperText,
  showPasswordToggle = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const actualType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
      )}

      <input
        id={id}
        name={name}
        type={actualType}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder=" "
        aria-invalid={error ? "true" : "false"}
        className={`peer w-full rounded-3xl border px-4 py-4 text-sm text-white outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
          Icon ? "pl-14" : "pl-4"
        } ${showPasswordToggle ? "pr-12" : "pr-4"} bg-slate-950/90 border-white/10 shadow-sm ${
          error ? "border-red-400 bg-red-500/10" : "hover:border-white/20"
        }`}
        {...props}
      />

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-cyan-300"
      >
        {label}
      </label>

      {type === "password" && showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

      {helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default FloatingInput;
