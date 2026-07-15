const Card = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-500
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;