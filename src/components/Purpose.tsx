import heroImg from "../assets/images/heroImg.png";
import trustImg from "../assets/images/trust.png";

interface PurposeCardData {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

const purposeItems: PurposeCardData[] = [
  {
    number: "01",
    title: "Customer Satisfaction",
    description:
      "We strive to set, deliver, and maintain the highest standards of quality and reliability in all our products and services.",
    image: heroImg,
    imageAlt: "SKLD team working in a manufacturing facility",
  },
  {
    number: "02",
    title: "Employee Management",
    description:
      "Our goal is to foster a shared sense of direction and create a supportive work environment that encourages personal and professional growth for all employees.",
    image: heroImg,
    imageAlt: "SKLD employees collaborating in a facility",
    imagePosition: "68% center",
  },
  {
    number: "03",
    title: "Partnership",
    description:
      "This approach has been a cornerstone of our business philosophy, and has helped us achieve lasting, productive relationships with our suppliers.",
    image: trustImg,
    imageAlt: "Business partners shaking hands",
    imagePosition: "42% center",
  },
  {
    number: "04",
    title: "Environmental Responsibility",
    description:
      "We take pride in continuously implementing environmentally friendly practices in our production and distribution processes and ensure our production and distribution methods are environmentally friendly.",
    image: heroImg,
    imageAlt: "SKLD team in a production environment",
  },
  {
    number: "05",
    title: "Social Responsibility",
    description:
      "This is not only a part of our corporate ethos, but also an opportunity for us to help achieve the Sustainable Development Goals.",
    image: heroImg,
    imageAlt: "SKLD team contributing to the community",
  },
];

const Purpose = () => {
  return (
    <section
      className="flex flex-col rounded-section bg-white dark:bg-[#181920] text-black dark:text-white mb-5 border border-transparent dark:border-white/5 transition-colors duration-300"
      style={{
        padding: "100px 150px",
        gap: "80px",
      }}
    >
      {/* Intro header */}
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
          Guided by Purpose, Driven by Impact
        </h2>
        <p className="text-[#333333] dark:text-zinc-300" style={{ width: "427px" }}>
          At the heart of everything we do are values that define our culture,
          guide our actions, and inspire trust in every relationship.
        </p>
      </div>

      {/* 3-column grid: card, image, card, image … */}
      <div
        className="grid max-w-full mx-auto"
        style={{
          width: "1116px",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "12px",
        }}
      >
        {purposeItems.map(({ number, title, description, image, imageAlt, imagePosition }, idx) => (
          <>
            {/* Card */}
            <article
              key={`card-${number}`}
              className="rounded-[9px] flex flex-col justify-between box-border bg-[#f3f5fc] dark:bg-[#20222a] transition-colors"
              style={{
                height: "336px",
                padding: "24px 22px 20px",
                minHeight: "184px",
              }}
            >
              <span
                className="text-[#011fbd] dark:text-blue-400 font-semibold"
                style={{
                  fontSize: "24px",
                  lineHeight: "36px",
                  letterSpacing: "-1.2px",
                }}
              >
                {number}
              </span>
              <div>
                <h4
                  className="font-medium text-black dark:text-white"
                  style={{
                    marginBottom: "10px",
                    fontSize: "18px",
                    lineHeight: "1.2",
                  }}
                >
                  {title}
                </h4>
                <p
                  className="text-[#333333] dark:text-[#f2f2f2]"
                  style={{
                    maxWidth: "270px",
                    fontSize: "12px",
                    lineHeight: "1.35",
                  }}
                >
                  {description}
                </p>
              </div>
            </article>

            {/* Image (except after the last card which has no image) */}
            {idx < purposeItems.length - 1 && (
              <img
                key={`img-${number}`}
                src={image}
                alt={imageAlt}
                className="block w-full rounded-[9px] object-cover"
                style={{
                  height: "336px",
                  minHeight: "184px",
                  objectPosition: imagePosition ?? "center",
                }}
              />
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default Purpose;
