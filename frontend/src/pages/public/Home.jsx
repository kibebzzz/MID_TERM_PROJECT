import { motion } from "framer-motion";
import StatsSection from "../../components/home/StatsSection";
import FeaturedArtists from "../../components/home/FeaturedArtists";
import TrendingArtwork from "../../components/home/TrendingArtwork";
import Categories from "../../components/home/Categories";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";

const Home = () => {
  return (
    <>
      {/* HERO */}

      <section className="relative overflow-hidden min-h-[90vh] flex items-center">

  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-cyan-100"></div>

  <div className="absolute top-24 left-10 w-72 h-72 bg-cyan-300 rounded-full blur-[120px] opacity-20"></div>

  <div className="absolute bottom-0 right-20 w-80 h-80 bg-cyan-200 rounded-full blur-[140px] opacity-30"></div>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center px-8 relative">

    {/* Left */}

    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >

      <p className="uppercase tracking-[0.35em] text-cyan-500 font-semibold">

        Empowering Artists

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

        Kenya's modern digital marketplace connecting artists
        with collectors across the country and beyond.

      </p>

      <div className="flex gap-5 mt-12">

        <button className="bg-cyan-400 hover:bg-cyan-500 transition px-8 py-4 rounded-xl text-white font-semibold">

          Explore Marketplace

        </button>

        <button className="border border-gray-300 hover:border-cyan-400 px-8 py-4 rounded-xl">

          Become an Artist

        </button>

      </div>

    </motion.div>

    {/* Right */}

    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className="hidden lg:flex justify-center"
    >

      <img
        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900"
        alt="Artwork"
        className="rounded-[40px] shadow-2xl w-[520px] h-[620px] object-cover"
      />

    </motion.div>

  </div>

</section>

      <section className="max-w-7xl mx-auto px-8 py-20">

  <StatsSection />

  <FeaturedArtists />

  <TrendingArtwork />

  <Categories />

  <Testimonials />

  <CTASection />

</section>

    </>
  );
};

export default Home;