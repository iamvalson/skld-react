import trustImg from "../assets/images/trust.png";

const stats = [
  { value: "10+", label: "years serving the education sector" },
  { value: "200+", label: "institutions served nationwide" },
  { value: "100%", label: "locally produced uniforms & furniture" },
  { value: "50+", label: "infrastructure projects delivered" },
];

const Trust = () => {
  return (
    <section
      className="bg-white dark:bg-[#181920] dark:text-white rounded-section flex flex-col mb-5 transition-colors duration-300 border border-transparent dark:border-white/5"
      style={{ padding: "100px 150px", gap: "80px" }}
    >
      {/* Top: image left + mission/vision right */}
      <div className="flex flex-row justify-between">
        {/* Left: heading + image */}
        <div className="flex flex-col" style={{ gap: "40px" }}>
          <h2
            className="font-bold"
            style={{
              width: "419px",
              fontSize: "36px",
              lineHeight: "46px",
              letterSpacing: "-0.25px",
            }}
          >
            Built on Innovation. Driven by Integrity.
          </h2>
          <img
            src={trustImg}
            alt=""
            className="object-cover rounded-lg"
            style={{ width: "452px", height: "436px" }}
          />
        </div>

        {/* Right: mission/vision + CTA */}
        <div className="flex flex-col" style={{ gap: "40px" }}>
          <div className="flex flex-col" style={{ gap: "60px" }}>
            <div className="flex flex-col">
              <h4
                className="font-semibold text-brand-blue dark:text-blue-400"
                style={{
                  fontSize: "24px",
                  letterSpacing: "-1.2px",
                }}
              >
                Missions
              </h4>
              <p className="text-[#333333] dark:text-zinc-300" style={{ fontSize: "16px", fontWeight: 400 }}>
                To provide innovative and scalable solutions that empower
                individuals, institutions, and economies across Africa.
              </p>
            </div>
            <div className="flex flex-col">
              <h4
                className="font-semibold text-brand-blue dark:text-blue-400"
                style={{
                  fontSize: "24px",
                  letterSpacing: "-1.2px",
                }}
              >
                Vision
              </h4>
              <p className="text-[#333333] dark:text-zinc-300" style={{ fontSize: "16px", fontWeight: 400 }}>
                A thriving Africa powered by quality education, local
                manufacturing, and sustainable infrastructure.
              </p>
            </div>
          </div>

          <div>
            <button
              className="px-4 py-[14px] bg-black dark:bg-white text-white dark:text-black cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black dark:hover:bg-zinc-200 border border-black dark:border-white"
            >
              See more
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-row items-center justify-center" style={{ gap: "20px" }}>
        {stats.map(({ value, label }) => (
          <div
            key={value}
            className="flex flex-col rounded-[16px] bg-[#1c1c1c0d] dark:bg-[#24252e] transition-colors"
            style={{
              padding: "20px",
              height: "240px",
              gap: "72px",
            }}
          >
            <h2
              className="font-medium"
              style={{ fontSize: "64px" }}
            >
              {value}
            </h2>
            <p
              className="text-[#333333] dark:text-zinc-300"
              style={{ width: "224px", fontSize: "14px" }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trust;
