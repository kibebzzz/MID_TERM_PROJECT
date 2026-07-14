const Logo = () => {
  return (
    <div className="flex items-center gap-3">

      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-300/40">

        <span className="text-white text-2xl font-black">
          P
        </span>

      </div>

      <div>

        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Palette
        </h1>

        <p className="text-xs tracking-wide text-gray-500">
          Empowering Artists.
        </p>

      </div>

    </div>
  );
};

export default Logo;