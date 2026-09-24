import card1 from "../assets/images/Card1.svg";
import card2 from "../assets/images/Card2.svg";
import card3 from "../assets/images/Card3.svg";
import card4 from "../assets/images/Card4.svg";

interface SolutionCardData {
  img: string;
  alt: string;
  title: string;
  description: string;
  ariaLabel: string;
}

const cards: SolutionCardData[] = [
  {
    img: card1,
    alt: "Garment manufacturing",
    title: "Garment Manufacturing",
    description:
      "Our dedicated garment manufacturing brand producing high-quality clothing for government, corporate, and retail clients.",
    ariaLabel: "Explore garment manufacturing",
  },
  {
    img: card2,
    alt: "Education solutions",
    title: "Education Solutions",
    description:
      "Reliable furniture, supplies, and learning environments designed to support schools and institutions.",
    ariaLabel: "Explore education solutions",
  },
  {
    img: card3,
    alt: "Corporate solutions",
    title: "Corporate Solutions",
    description:
      "Practical sourcing and infrastructure support that helps organizations work better and grow sustainably.",
    ariaLabel: "Explore corporate solutions",
  },
  {
    img: card4,
    alt: "Infrastructure solutions",
    title: "Infrastructure",
    description:
      "End-to-end project execution and dependable supply for institutions, communities, and public organizations.",
    ariaLabel: "Explore infrastructure solutions",
  },
];

const Solutions = () => {
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
          Comprehensive Solutions for Modern Learning Environments
        </h2>
        <p className="text-[#333333] dark:text-zinc-300" style={{ width: "427px" }}>
          From everyday classroom essentials to large-scale school development,
          SKLD delivers end-to-end education support services trusted by
          institutions across Nigeria.
        </p>
      </div>

      {/* Cards */}
      <div
        className="flex flex-row items-stretch justify-center flex-wrap"
        style={{ gap: "24px" }}
      >
        {cards.map(({ img, alt, title, description, ariaLabel }) => (
          <article
            key={title}
            className="solution-card"
            style={{ flex: "0 1 264px", width: "264px", maxWidth: "100%" }}
            tabIndex={0}
          >
            <img src={img} alt={alt} />
            <div className="solution-hover">
              <h3
                className="font-medium"
                style={{
                  margin: "0 0 8px",
                  fontSize: "16px",
                  lineHeight: "1.25",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  maxWidth: "205px",
                  margin: "0",
                  fontSize: "12px",
                  lineHeight: "1.5",
                }}
              >
                {description}
              </p>
              <button
                type="button"
                aria-label={ariaLabel}
                className="absolute right-5 bottom-5 bg-brand-dark dark:bg-[#323440] text-white cursor-pointer text-lg hover:bg-brand-blue dark:hover:bg-brand-blue transition-colors"
                style={{ width: "48px", height: "48px", border: "0" }}
              >
                &rarr;
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
