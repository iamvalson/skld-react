import { useState } from "react";
import heroImg from "../assets/images/heroImg.png";
import trustImg from "../assets/images/trust.png";

interface InsightCardData {
  img: string;
  alt: string;
  title: string;
}

const insightCards: InsightCardData[] = [
  {
    img: heroImg,
    alt: "Team collaborating around a table",
    title: "How SKLD Is Transforming Public Schools with Smart Furniture",
  },
  {
    img: trustImg,
    alt: "Business partners collaborating",
    title:
      "Sustainable Sourcing: The Importance of Eco-Friendly Materials in School Furniture",
  },
  {
    img: heroImg,
    alt: "People working together",
    title: "Designing for Neurodiversity: Creating Inclusive Learning Environments",
  },
  {
    img: trustImg,
    alt: "Partners meeting together",
    title: "Beyond the Desk: The Role of Soft Seating in Modern Libraries",
  },
  {
    img: heroImg,
    alt: "A team sharing ideas",
    title: "Case Study: How Flexible Seating Increased Collaboration",
  },
];

const CARD_WIDTH = 260;
const CARD_GAP = 20;
const VISIBLE_CARDS = 3;
const TOTAL_PAGES = insightCards.length - VISIBLE_CARDS + 1;

const Insights = () => {
  const [activePage, setActivePage] = useState(0);

  const handlePrev = () => setActivePage((p) => Math.max(0, p - 1));
  const handleNext = () => setActivePage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

  const trackOffset = activePage * (CARD_WIDTH + CARD_GAP);

  return (
    <section
      className="mb-3 overflow-hidden bg-white dark:bg-[#181920] dark:text-white rounded-section transition-colors duration-300 border border-transparent dark:border-white/5"
      style={{ padding: "100px 150px" }}
    >
      {/* Heading row */}
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: "80px" }}
      >
        <h2
          className="font-bold m-0"
          style={{ fontSize: "36px", lineHeight: "1.25" }}
        >
          Insights
          <br />
          &amp; Updates
        </h2>
        <button className="px-4 py-[14px] bg-black dark:bg-white text-white dark:text-black cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black dark:hover:bg-zinc-200 border border-black dark:border-white">
          See more
        </button>
      </div>

      {/* Carousel viewport */}
      <div style={{ overflow: "visible" }}>
        <div
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            width: "max-content",
            marginLeft: "24px",
            transform: `translateX(-${trackOffset}px)`,
            transition: "transform 400ms ease",
          }}
        >
          {insightCards.map(({ img, alt, title }) => (
            <article
              key={title}
              style={{ width: `${CARD_WIDTH}px`, flex: `0 0 ${CARD_WIDTH}px` }}
            >
              <img
                src={img}
                alt={alt}
                className="block rounded-[16px] object-cover"
                style={{ width: `${CARD_WIDTH}px`, height: "196px" }}
              />
              <h3
                className="font-medium text-black dark:text-white"
                style={{
                  margin: "14px 0 0",
                  fontSize: "16px",
                  lineHeight: "1.45",
                }}
              >
                {title}
              </h3>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: "78px" }}
      >
        {/* Dots */}
        <div
          className="flex rounded-[99px] bg-[#f5f5f5] dark:bg-[#24252e] transition-colors"
          style={{
            gap: "8px",
            padding: "8px 12px",
          }}
          aria-label="Insight pages"
        >
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1}`}
              onClick={() => setActivePage(i)}
              className={i === activePage ? "bg-[#1238d1]" : "bg-[#c7c7c7] dark:bg-[#52525b]"}
              style={{
                width: "12px",
                height: "12px",
                padding: 0,
                border: 0,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex" style={{ gap: "16px" }}>
          <button
            type="button"
            aria-label="Previous insights"
            onClick={handlePrev}
            className="text-white cursor-pointer transition-colors duration-200 bg-[#111111] dark:bg-[#24252e] dark:hover:bg-[#323440] flex items-center justify-center"
            style={{
              width: "48px",
              height: "48px",
              fontSize: "20px",
              border: 0,
            }}
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Next insights"
            onClick={handleNext}
            className="text-white cursor-pointer transition-colors duration-200 bg-[#111111] dark:bg-[#24252e] dark:hover:bg-[#323440] flex items-center justify-center"
            style={{
              width: "48px",
              height: "48px",
              fontSize: "20px",
              border: 0,
            }}
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Insights;
