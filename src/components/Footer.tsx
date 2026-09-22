import logo from "../assets/images/logo.svg";
import logoBlack from "../assets/images/logo-black.svg";
import { useTheme } from "../context/ThemeContext";

const footerGroups = [
  {
    heading: "Quick Links",
    links: ["About Us", "Blog & News", "Projects", "Careers", "Contact Us"],
  },
  {
    heading: "Solutions",
    links: ["Skit Store", "Marcel Hughes", "Weave Work", "SKLD Relief"],
  },
  {
    heading: "Help",
    links: ["Privacy Policy", "Terms of Service", "Cookies"],
  },
  {
    heading: "Socials",
    links: ["Facebook", "Instagram", "LinkedIn", "Twitter (X)"],
  },
];

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className="bg-[#f7f7f7] dark:bg-[#0f1015] text-[#1c1c1c] dark:text-zinc-300 transition-colors duration-300"
      style={{
        padding: "100px 150px",
      }}
    >
      {/* Link columns */}
      <div
        className="grid max-w-[1360px] mx-auto"
        style={{
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "48px",
          marginBottom: "106px",
        }}
      >
        {footerGroups.map(({ heading, links }) => (
          <div key={heading} className="flex flex-col items-start" style={{ gap: "20px" }}>
            <h2
              className="font-medium text-[#ababab] dark:text-zinc-400"
              style={{
                margin: "0 0 10px",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              {heading}
            </h2>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="no-underline hover:underline underline-offset-4 text-[#1c1c1c] dark:text-zinc-300 dark:hover:text-white transition-colors"
                style={{ fontSize: "14px" }}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Branding */}
      <div className="max-w-[1360px] mx-auto">
        <img
          src={theme === "dark" ? logo : logoBlack}
          alt="SKLD Integrated Services"
          className="block"
          style={{ width: "142px", height: "auto", marginBottom: "50px" }}
        />
        <p
          className="font-bold text-black dark:text-white"
          style={{
            maxWidth: "1340px",
            margin: "0 0 16px",
            fontSize: "15px",
            lineHeight: "1.45",
          }}
        >
          &copy; 2025 SKLD Integrated Services Limited. All rights reserved.
        </p>
        <p
          className="text-black/80 dark:text-zinc-400"
          style={{
            maxWidth: "1340px",
            margin: "0",
            fontSize: "15px",
            lineHeight: "1.45",
          }}
        >
          SKLD is Nigeria&rsquo;s trusted education supply and infrastructure company,
          offering reliable delivery, bulk procurement, and end-to-end project
          execution for schools, governments, and institutions across Lagos,
          Abuja, Port Harcourt, and beyond.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
