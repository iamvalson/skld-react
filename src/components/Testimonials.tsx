import trustImg from "../assets/images/trust.png";
import heroImg from "../assets/images/heroImg.png";

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  size?: "tall" | "large" | "normal";
}

const col1: TestimonialData[] = [
  {
    quote:
      "\u201cPartnering with SKLD for our office supplies has streamlined our procurement process, saving us both time and money.\u201d",
    name: "Mr. Tunde Okoro",
    role: "Operations Manager, Sterling Innovations, Lagos",
    avatar: trustImg,
    size: "tall",
  },
  {
    quote:
      "The quality of products is consistently high. From stationery to ergonomic furniture, we\u2019ve never been disappointed. It\u2019s great value for money.",
    name: "Dr. Emeka Nwosu",
    role: "Managing Director, Crestview Medical Center, Port Harcourt",
    avatar: heroImg,
    size: "large",
  },
  {
    quote:
      "\u201cPartnering with SKLD for our office supplies has streamlined our procurement process, saving us both time and money.\u201d",
    name: "Mr. Tunde Okoro",
    role: "Operations Manager, Sterling Innovations, Lagos",
    avatar: trustImg,
  },
];

const col2: TestimonialData[] = [
  {
    quote:
      "Their customer service team is a pleasure to work with. They are knowledgeable, friendly, and always ready to help us find the perfect solution.",
    name: "Ms. Funke Adebayo",
    role: "Studio Lead, Kobo Art House, Ibadan",
    avatar: heroImg,
  },
  {
    quote:
      "SKLD\u2019s delivery is incredibly fast and reliable. We placed a large order for our annual conference, and everything arrived ahead of schedule.",
    name: "Mrs. Aisha Bello",
    role: "Head of Administration, Zenith Bank, Abuja",
    avatar: trustImg,
    size: "large",
  },
  {
    quote:
      "Their customer service team is a pleasure to work with. They are knowledgeable, friendly, and always ready to help us find the perfect solution.",
    name: "Ms. Funke Adebayo",
    role: "Studio Lead, Kobo Art House, Ibadan",
    avatar: heroImg,
  },
];

const col3: TestimonialData[] = [
  {
    quote:
      "The online portal makes ordering a breeze. We can easily track expenses and manage our inventory, which has improved our internal efficiency.",
    name: "Mr. Ibrahim Danjuma",
    role: "Finance Director, Kano Textiles Ltd., Kano",
    avatar: trustImg,
    size: "tall",
  },
  {
    quote:
      "As a startup, managing costs is crucial. SKLD\u2019s competitive pricing allows us to equip our office with quality supplies without breaking the bank.",
    name: "Mrs. Chiamaka Eze",
    role: "Office Coordinator, Paystack, Enugu",
    avatar: heroImg,
    size: "large",
  },
  {
    quote:
      "The online portal makes ordering a breeze. We can easily track expenses and manage our inventory, which has improved our internal efficiency.",
    name: "Mr. Ibrahim Danjuma",
    role: "Finance Director, Kano Textiles Ltd., Kano",
    avatar: trustImg,
  },
];

const sizeClass = (size?: "tall" | "large" | "normal") => {
  if (size === "large") return "239px";
  return "166px";
};

interface CardProps {
  data: TestimonialData;
}

const TestimonialCard = ({ data }: CardProps) => (
  <article
    className="rounded-[12px] flex flex-col justify-between box-border bg-[#f3f5fc] dark:bg-[#24252e] transition-colors"
    style={{
      minHeight: sizeClass(data.size),
      padding: "17px 16px 14px",
    }}
  >
    <p
      className="text-[#161616] dark:text-zinc-200"
      style={{
        margin: "0 0 18px",
        fontSize: "14px",
        lineHeight: "1.35",
      }}
    >
      {data.quote}
    </p>
    <div className="flex flex-col items-start" style={{ gap: "9px" }}>
      <img
        src={data.avatar}
        alt={data.name}
        className="rounded-full object-cover"
        style={{ width: "40px", height: "40px" }}
      />
      <div>
        <h3
          className="font-bold block text-black dark:text-white"
          style={{ margin: "0 0 2px", fontSize: "16px", lineHeight: "1.2" }}
        >
          {data.name}
        </h3>
        <span
          className="block text-[#373737] dark:text-zinc-400"
          style={{ fontSize: "12px", lineHeight: "1.3" }}
        >
          {data.role}
        </span>
      </div>
    </div>
  </article>
);

const Testimonials = () => {
  return (
    <section
      className="relative overflow-hidden flex flex-col rounded-section bg-white dark:bg-[#181920] dark:text-white mb-5 transition-colors duration-300 border border-transparent dark:border-white/5"
      style={{ padding: "100px 150px", gap: "80px" }}
    >
      {/* Intro */}
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
          Real Results.
          <br />
          Proven Impact.
        </h2>
        <p className="text-[#333333] dark:text-zinc-300" style={{ width: "427px" }}>
          We collaborate with top institutions, government agencies, and private
          organizations to deliver lasting impact in education, infrastructure,
          and garment production.
        </p>
      </div>

      {/* Blur overlays (top set) */}
      <span className="testimonial-blur testimonial-blur--center" aria-hidden="true" />
      <span className="testimonial-blur testimonial-blur--right" aria-hidden="true" />
      <span className="testimonial-blur testimonial-blur--left" aria-hidden="true" />

      {/* Grid */}
      <div
        className="relative z-[1] grid max-w-full mx-auto items-start"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "12px",
          width: "1116px",
        }}
      >
        {/* Column 1 */}
        <div className="flex flex-col" style={{ gap: "12px" }}>
          {col1.map((t, i) => <TestimonialCard key={i} data={t} />)}
        </div>
        {/* Column 2 */}
        <div className="flex flex-col" style={{ gap: "12px" }}>
          {col2.map((t, i) => <TestimonialCard key={i} data={t} />)}
        </div>
        {/* Column 3 */}
        <div className="flex flex-col" style={{ gap: "12px" }}>
          {col3.map((t, i) => <TestimonialCard key={i} data={t} />)}
        </div>
      </div>

      {/* Blur overlays (bottom set) */}
      <span className="testimonial-blur testimonial-blur--center" aria-hidden="true" />
      <span className="testimonial-blur testimonial-blur--right" aria-hidden="true" />
      <span className="testimonial-blur testimonial-blur--left" aria-hidden="true" />
    </section>
  );
};

export default Testimonials;
