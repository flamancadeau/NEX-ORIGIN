import * as React from "react";

/**
 * Branded loading/splash screen for NEX ORIGIN.
 * Uses brand typography (Bebas Neue for NEX, Orbitron for ORIGIN)
 * and the Primary Gold (#f2d975) accent.
 */
export function LoadingScreen() {
  const [visible, setVisible] = React.useState(true);
  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 800);
    const hideTimer = setTimeout(() => setVisible(false), 1200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] transition-opacity duration-400 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="h-16 w-16 rounded-2xl bg-[#f2d975] flex items-center justify-center shadow-xl shadow-[#f2d975]/30">
          <img
            src="https://res.cloudinary.com/ds34h7zrm/image/upload/v1774626876/favicon_qz0x6b.svg"
            alt="NEX ORIGIN Logo"
            className="h-9 w-9"
          />
        </div>
        <span className="brand-logo text-[#f2d975]">
          <span className="brand-nex text-3xl">NEX</span>
          <span className="brand-origin text-2xl">ORIGIN</span>
        </span>
        <span className="text-xs text-[#ffffff]/60 brand-tagline">
          Premium Electronics
        </span>
      </div>
    </div>
  );
}