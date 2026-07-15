const Input = ({
  className = "",
  ...props
}) => {
  return (
    <input
      className={`
        w-full
        px-5
        py-3
        rounded-xl
        border
        border-gray-300
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400
        transition
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;