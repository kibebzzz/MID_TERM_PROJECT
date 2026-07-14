const SectionHeader = ({ title, subtitle, center = false }) => {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <p className="uppercase tracking-[0.25em] text-cyan-500 font-semibold text-sm">
        Palette
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900">
        {title}
      </h2>

      <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;