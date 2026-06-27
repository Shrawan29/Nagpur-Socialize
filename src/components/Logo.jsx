// Nagpur Socialize logo lockup (official mark + wordmark).
// Source: /public/logo.png processed to transparent /public/logo-mark.png
// (see scripts/process-logo.mjs).
export default function Logo({ className = "" }) {
  return (
    <a
      href="#/"
      className={`inline-flex items-center select-none ${className}`}
      aria-label="Nagpur Socialize — home"
    >
      <img
        src="/logo-mark.png"
        alt="Nagpur Socialize"
        className="site-logo h-9 w-auto sm:h-10"
        draggable="false"
      />
    </a>
  );
}
