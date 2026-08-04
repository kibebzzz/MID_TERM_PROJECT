import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-cyan-100"></div>

      <div className="absolute top-24 left-10 w-72 h-72 bg-cyan-300 rounded-full blur-[120px] opacity-20"></div>

      <div className="absolute bottom-0 right-20 w-80 h-80 bg-cyan-200 rounded-full blur-[140px] opacity-30"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center px-8 relative">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="uppercase tracking-[0.35em] text-cyan-500 font-semibold">
            Empowering Creators
          </p>

          <h1 className="text-7xl lg:text-8xl font-black leading-tight mt-6">
            Discover
            <br />
            Extraordinary
            <span className="text-cyan-400">
              {" "}Creativity
            </span>
          </h1>

          <p className="mt-10 text-xl text-gray-600 leading-9 max-w-xl">
            Kenya's creative marketplace connecting artists,
            musicians, photographers, fashion designers and
            collectors in one vibrant ecosystem.
          </p>

          <div className="flex gap-5 mt-12">

            <Link to="/marketplace">
              <Button>
                Explore Marketplace
              </Button>
            </Link>

            <Link to="/register">
            <Button variant="outline">
               Become a Creator
            </Button>
            </Link>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="hidden lg:flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900"
            alt="Creative Work"
            className="rounded-[40px] shadow-2xl w-[520px] h-[620px] object-cover"
          />
        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;