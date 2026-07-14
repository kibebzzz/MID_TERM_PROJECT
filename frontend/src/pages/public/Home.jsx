import { motion } from "framer-motion";
import StatsSection from "../../components/home/StatsSection";
import FeaturedArtists from "../../components/home/FeaturedArtists";
import TrendingArtwork from "../../components/home/TrendingArtwork";
import Categories from "../../components/home/Categories";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";
import HeroSection from "../../components/home/HeroSection";

const Home = () => {
  return (
    <>
  <HeroSection />

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