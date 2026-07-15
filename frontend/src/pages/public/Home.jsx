import { motion } from "framer-motion";
import StatsSection from "../../components/home/StatsSection";
import FeaturedArtists from "../../components/home/FeaturedArtists";
import TrendingArtwork from "../../components/home/TrendingArtwork";
import Categories from "../../components/home/Categories";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";
import HeroSection from "../../components/home/HeroSection";
import PageWrapper from "../../components/common/PageWrapper";


const Home = () => {
  return (

    <PageWrapper> 
  <HeroSection />

      <section className="max-w-7xl mx-auto px-8 py-20">

  <StatsSection />

  <FeaturedArtists />

  <TrendingArtwork />

  <Categories />

  <Testimonials />

  <CTASection />

</section>
    </PageWrapper>
  );
};

export default Home;