import Header from "./components/Header";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Category from "./components/Category";
import Footer from "./components/Footer";

function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <Hero />
      <Showcase />
      <Category />
      <Footer />
    </div>
  );
}

export default Home;
