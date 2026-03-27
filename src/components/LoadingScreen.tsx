import * as React from "react";

/**
 * Branded loading/splash screen for NEX ORIGIN.
 * Shows the logo with a pulse animation while pages load.
 * Fades out after a brief delay.
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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-400 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
          <img
            src="https://res.cloudinary.com/ds34h7zrm/image/upload/v1774626876/favicon_qz0x6b.svg"
            alt="NEX ORIGIN Logo"
            className="h-9 w-9"
          />
        </div>
        <span className="text-2xl font-black tracking-tight">NEX ORIGIN</span>
        <span className="text-xs text-muted-foreground font-medium">
          Premium Electronics
        </span>
      </div>

      {/* Loading bar */}
      {/* <div className="mt-8 w-32 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-loading-bar" />
      </div> */}
    </div>
  );
}