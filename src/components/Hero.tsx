import heroImg from "../assets/images/heroImg.png";

const Hero = () => {
  return (
    <section
      className="w-full box-border bg-white dark:bg-[#181920] dark:text-white rounded-section overflow-hidden flex flex-col items-center justify-center mb-3 transition-colors duration-300 border border-transparent dark:border-white/5"
      style={{ paddingTop: "240px" }}
    >
      {/* Content */}
      <div
        className="self-start flex flex-col gap-6 text-left"
        style={{
          width: "min(762px, calc(100% - 20vw))",
          marginLeft: "10vw",
        }}
      >
        <h2
          className="font-extrabold"
          style={{
            fontSize: "48px",
            lineHeight: "58px",
            letterSpacing: "-0.5px",
          }}
        >
          <span
            className="text-[#011fbd] bg-[#011fbd33] dark:text-blue-400 dark:bg-blue-950/60 px-[10px] rounded-sm"
          >
            Industry experts redefining
          </span>{" "}
          manufacturing &amp; sourcing excellence through innovation &amp;
          technology
        </h2>
        <p
          className="font-medium text-[#333333] dark:text-zinc-300"
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            letterSpacing: "-0.2px",
          }}
        >
          From retail and manufacturing to education, corporate, and
          humanitarian supply, we deliver quality and efficiency through a
          seamless, end-to-end sourcing and delivery network
        </p>
      </div>

      {/* Hero Image */}
      <div
        className="w-full flex justify-center items-center mb-0"
        style={{ marginTop: "60px" }}
      >
        <img
          src={heroImg}
          alt="hero-img"
          className="block w-full rounded-bl-section rounded-br-section"
          style={{ maxWidth: "none", height: "auto" }}
        />
      </div>
    </section>
  );
};

export default Hero;
