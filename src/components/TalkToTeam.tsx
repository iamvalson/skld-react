const TalkToTeam = () => {
  return (
    <section
      className="flex flex-col items-center justify-center rounded-section mb-5 bg-white dark:bg-[#181920] border border-transparent dark:border-white/5 transition-colors duration-300"
      style={{
        padding: "166px 434px",
        gap: "40px",
      }}
    >
      <div
        className="flex flex-col text-black dark:text-white text-center"
        style={{ gap: "24px" }}
      >
        <h2
          className="font-bold"
          style={{ fontSize: "36px", letterSpacing: "-0.25px" }}
        >
          Let&rsquo;s Build Something <br />
          Exceptional Together
        </h2>
        <p
          className="text-[#333333] dark:text-zinc-300"
          style={{
            maxWidth: "548px",
            fontSize: "14px",
            letterSpacing: "-0.2px",
          }}
        >
          From everyday classroom essentials to large-scale school development,
          SKLD delivers end-to-end education support services trusted by
          institutions across Nigeria.
        </p>
      </div>
      <div>
        <button className="px-4 py-[14px] bg-black dark:bg-white text-white dark:text-black cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black dark:hover:bg-zinc-200 border border-black dark:border-white text-sm">
          Talk With Our Team
        </button>
      </div>
    </section>
  );
};

export default TalkToTeam;
