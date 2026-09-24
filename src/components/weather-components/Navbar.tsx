import { Link } from "react-router-dom";
import { IoSearch, IoMoon, IoSunny, IoArrowBack } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import type { TemperatureUnit } from "../../types/weather";

interface NavbarProps {
  onSearchOpen: () => void;
  unit: TemperatureUnit;
  onUnitToggle: () => void;
}

const Navbar = ({ onSearchOpen, unit, onUnitToggle }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-row justify-between items-center px-6 md:px-10 py-5">
      {/* Left side: Back to SKLD + Brand */}
      <div className="flex items-center gap-3 md:gap-5">
        <Link
          to="/"
          aria-label="Back to SKLD"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-border dark:border-white/15 text-xs font-poppins font-medium text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
        >
          <IoArrowBack className="text-sm transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Back to SKLD</span>
          <span className="sm:hidden">SKLD</span>
        </Link>

        <h1 className="text-xl md:text-2xl font-newsreader tracking-widest uppercase text-brand-dark dark:text-white select-none">
          The Atmosphere
        </h1>
      </div>

      {/* Right side: Controls */}
      <nav className="flex items-center gap-2 md:gap-3">
        {/* Unit toggle */}
        <button
          onClick={onUnitToggle}
          aria-label={`Switch to ${unit === "celsius" ? "Fahrenheit" : "Celsius"}`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-brand-border dark:border-white/15 text-xs font-poppins font-medium text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className={unit === "celsius" ? "opacity-100" : "opacity-40"}>
            °C
          </span>
          <span className="opacity-20">/</span>
          <span
            className={unit === "fahrenheit" ? "opacity-100" : "opacity-40"}
          >
            °F
          </span>
        </button>

        {/* Search */}
        <button
          onClick={onSearchOpen}
          aria-label="Search location"
          className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full border border-brand-border dark:border-white/15 text-sm font-poppins text-brand-dark/60 dark:text-white/50 hover:text-brand-dark dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <IoSearch className="text-base shrink-0" />
          <span className="hidden sm:inline">Search city</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-border dark:border-white/15 text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          {theme === "dark" ? (
            <IoSunny className="text-base" />
          ) : (
            <IoMoon className="text-base" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
