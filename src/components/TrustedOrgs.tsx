import valueslek from "../assets/images/valueslek.png";
import canon from "../assets/images/canon.png";
import sharp from "../assets/images/sharp.png";
import hp from "../assets/images/hp.png";

const TrustedOrgs = () => {
  const logos = [
    { src: valueslek, alt: "value-slek logo" },
    { src: canon, alt: "canon logo" },
    { src: sharp, alt: "sharp logo" },
    { src: hp, alt: "hp logo" },
  ];

  return (
    <section
      className="bg-white dark:bg-[#181920] dark:text-white rounded-section flex flex-col mb-5 transition-colors duration-300 border border-transparent dark:border-white/5"
      style={{ padding: "100px 150px", gap: "80px" }}
    >
      {/* Section header */}
      <div className="flex flex-row justify-between">
        <h2
          className="font-bold"
          style={{
            width: "419px",
            fontSize: "36px",
            lineHeight: "46px",
            letterSpacing: "-0.25px",
          }}
        >
          Trusted by Thousands of Organizations Across Africa
        </h2>
        <p className="text-[#333333] dark:text-zinc-300" style={{ width: "427px" }}>
          We're proud to support enterprises, institutions, and entrepreneurs
          with world-class solutions tailored to local challenges.
        </p>
      </div>

      {/* Logo row */}
      <div className="flex flex-row items-center justify-between">
        {logos.map(({ src, alt }) => (
          <img
            key={alt}
            src={src}
            alt={alt}
            className="object-contain dark:brightness-110 dark:contrast-125 dark:opacity-90 hover:opacity-100 transition-opacity"
            style={{ width: "140px", height: "140px" }}
          />
        ))}
      </div>
    </section>
  );
};

export default TrustedOrgs;
