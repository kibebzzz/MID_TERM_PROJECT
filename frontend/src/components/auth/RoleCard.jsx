const RoleCard = ({
  title,
  icon,
  description,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-2xl
        border-2
        p-6
        transition-all
        duration-300
        hover:shadow-xl
        ${
          selected
            ? "border-cyan-500 bg-cyan-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold mt-4">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>
    </div>
  );
};

export default RoleCard;