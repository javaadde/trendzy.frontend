import Header from "../Home/components/Header";
import Hero from "../Home/components/Hero";
import Category from "../Home/components/Category";
import Lookbook from "../Home/components/Lookbook";
import Editorial from "../Home/components/Editorial";
import Footer from "../Home/components/Footer";

function HomeNotLogined() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <Hero />
      <Category />
      <Lookbook />
      <Editorial />
      <Footer />
    </div>
  );
}

export default HomeNotLogined;
