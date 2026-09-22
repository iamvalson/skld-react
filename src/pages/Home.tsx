import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedOrgs from "../components/TrustedOrgs";
import Solutions from "../components/Solutions";
import Trust from "../components/Trust";
import Purpose from "../components/Purpose";
import Testimonials from "../components/Testimonials";
import Insights from "../components/Insights";
import TalkToTeam from "../components/TalkToTeam";
import Footer from "../components/Footer";

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
