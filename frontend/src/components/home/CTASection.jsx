import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-32">

      <div className="max-w-5xl mx-auto bg-cyan-400 rounded-3xl p-16 text-center text-white">

        <h2 className="text-5xl font-bold">
          Ready to Share Your Creativity?
        </h2>

        <p className="mt-6 text-xl opacity-90">
          Join thousands of artists and collectors on Palette.
        </p>

          <Link to="/register">
            <button className="mt-10 bg-white text-cyan-500 px-10 py-4 rounded-xl font-semibold hover:scale-105 transition">
              Get Started
            </button>
          </Link>
         

      </div>

    </section>
  );
};

export default CTASection;