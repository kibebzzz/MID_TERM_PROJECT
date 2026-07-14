const stats = [
  { value: "500+", label: "Verified Artists" },
  { value: "12K+", label: "Artworks Listed" },
  { value: "40+", label: "Categories" },
  { value: "20K+", label: "Happy Collectors" },
];

const StatsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((item) => (
          <div key={item.label}>
            <h2 className="text-5xl font-bold text-cyan-400">
              {item.value}
            </h2>

            <p className="text-gray-500 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;