import { useEffect } from "react";
import Header from "../Home/components/Header";
import Footer from "../Home/components/Footer";
import AboutHero from "./components/AboutHero";
import Story from "./components/Story";
import Features from "./components/Features";
import Team from "./components/Team";
import Reviews from "./components/Reviews";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
        <AboutHero />
        <Story />
        <Features />
        <Team />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}

export default About;
