import logo from "../assets/images/logo.svg";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="fixed z-10 top-6 right-12 left-12 bg-brand-dark dark:bg-[#121318] flex flex-row justify-between items-center px-4 py-4 rounded-[99px] font-lato transition-colors duration-300 border border-transparent dark:border-white/10 shadow-lg"
      style={{ padding: "16px 24px 16px 16px" }}
    >
      <img src={logo} alt="SKLD logo" className="h-8 w-auto" />

      <nav className="flex flex-row gap-1">
        {[
          { label: "Home" },
          { label: "About" },
          { label: "Blog" },
        ].map(({ label }) => (
          <a
            key={label}
            href="#"
            className="bg-black dark:bg-[#1c1d24] text-white no-underline px-4 py-[14px] transition-colors duration-200 hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black text-sm"
          >
            {label}
          </a>
        ))}
        <a
          href="#"
          className="bg-black dark:bg-[#1c1d24] text-white no-underline px-4 py-[14px] transition-colors duration-200 hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black text-sm flex flex-row items-center gap-2"
        >
          Brands{" "}
          <span className="text-white text-[8px] leading-none">
            &#x25BC;
          </span>
        </a>
      </nav>

      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 dark:bg-white/10 text-white hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all duration-200 border border-white/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {theme === "dark" ? (
            <svg
              className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 transition-transform duration-300 -rotate-12 hover:rotate-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        <button className="bg-white text-black border border-[#e7e7e7] px-4 py-[14px] cursor-pointer transition-colors duration-200 hover:bg-[#f7f7f7] text-sm">
          Get in Touch
        </button>
      </div>
    </header>
  );
};

export default Navbar;
