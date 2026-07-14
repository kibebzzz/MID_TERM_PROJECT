const Logo = () => {
  return (
    <div className="flex items-center gap-3">

      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
        P
      </div>

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Palette
        </h1>

        <p className="text-xs text-gray-500 tracking-wide">
          Empowering Artists. Connecting Collectors.
        </p>
      </div>

    </div>
  );
};

export default Logo;