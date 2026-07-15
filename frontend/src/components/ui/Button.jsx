const variants = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-cyan-300/40",

  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200",

  outline:
    "border border-gray-300 bg-white hover:border-cyan-400",

  danger:
    "bg-red-500 text-white hover:bg-red-600",

  success:
    "bg-green-500 text-white hover:bg-green-600",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        rounded-xl
        font-semibold
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;