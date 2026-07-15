const variants = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-cyan-300/40",

  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200",

  outline:
    "border border-gray-300 hover:border-cyan-400 bg-white",

  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;