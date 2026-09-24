import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Insights from "../components/Insights";
import Navbar from "../components/Navbar";
import Purpose from "../components/Purpose";
import Solutions from "../components/Solutions";
import TalkToTeam from "../components/TalkToTeam";
import Testimonials from "../components/Testimonials";
import Trust from "../components/Trust";
import TrustedOrgs from "../components/TrustedOrgs";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="m-3 font-poppins">
        <Hero />
        <TrustedOrgs />
        <Solutions />
        <Trust />
        <Purpose />
        <Testimonials />
        <Insights />
        <TalkToTeam />
      </main>
      <Footer />
    </>
  );
};

export default Home;
