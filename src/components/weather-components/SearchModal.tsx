import { useState, useEffect, useRef, useCallback } from "react";
import { IoSearch, IoClose, IoLocationOutline } from "react-icons/io5";
import type { GeoLocation } from "../../types/weather";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: GeoLocation) => void;
  searchLocations: (query: string) => Promise<GeoLocation[]>;
}

const SearchModal = ({
  isOpen,
  onClose,
  onSelectLocation,
  searchLocations,
}: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetState = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    setResults([]);
    setSearching(false);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  // Focus input when modal opens and clean up debounce on unmount
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, handleClose]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!value.trim()) {
        setResults([]);
        setSearching(false);
        return;
      }
      debounceRef.current = setTimeout(async () => {
        setSearching(true);
        try {
          const res = await searchLocations(value);
          setResults(res);
        } catch {
          setResults([]);
        } finally {
          setSearching(false);
        }
      }, 350);
    },
    [searchLocations]
  );

  const handleSelect = (loc: GeoLocation) => {
    onSelectLocation(loc);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="bg-brand-cream dark:bg-[#1a1b21] rounded-2xl shadow-2xl overflow-hidden border border-brand-border dark:border-white/10">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-border dark:border-white/10">
            <IoSearch className="text-xl text-brand-dark/50 dark:text-white/40 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search city or location…"
              className="flex-1 bg-transparent text-brand-dark dark:text-white text-base placeholder:text-brand-dark/40 dark:placeholder:text-white/30 outline-none font-poppins"
            />
            {query && (
              <button
                onClick={() => handleSearch("")}
                className="text-brand-dark/50 dark:text-white/40 hover:text-brand-dark dark:hover:text-white transition-colors"
                aria-label="Clear search query"
              >
                <IoClose className="text-xl" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto">
            {searching && (
              <div className="flex items-center justify-center py-8">
                <span className="text-sm text-brand-dark/50 dark:text-white/40 font-poppins animate-pulse">
                  Searching…
                </span>
              </div>
            )}

            {!searching && query && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <span className="text-2xl">🌍</span>
                <span className="text-sm text-brand-dark/50 dark:text-white/40 font-poppins">
                  No locations found for "{query}"
                </span>
              </div>
            )}

            {!searching && results.length > 0 && (
              <ul>
                {results.map((loc) => (
                  <li key={loc.id}>
                    <button
                      onClick={() => handleSelect(loc)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                    >
                      <IoLocationOutline className="text-lg text-brand-dark/40 dark:text-white/30 shrink-0 group-hover:text-brand-dark dark:group-hover:text-white transition-colors" />
                      <div>
                        <p className="text-sm font-medium text-brand-dark dark:text-white font-poppins">
                          {loc.name}
                          {loc.admin1 ? `, ${loc.admin1}` : ""}
                        </p>
                        <p className="text-xs text-brand-dark/50 dark:text-white/40 font-poppins">
                          {loc.country}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!searching && !query && (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <span className="text-3xl">🔍</span>
                <span className="text-sm text-brand-dark/50 dark:text-white/40 font-poppins">
                  Type a city name to get started
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
