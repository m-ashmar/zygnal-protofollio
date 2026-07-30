import Logo from "@/components/site/Logo";

/**
 * A large, very faint background wordmark — a recurring "brand moment"
 * echoing the ghost index numerals already used in section headers. Purely
 * decorative: bleeds off the section edge, never competes with content.
 */
export default function LogoWatermark({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <Logo
      decorative
      className={`pointer-events-none absolute select-none text-text opacity-[0.11] ${
        flip ? "-scale-x-100" : ""
      } ${className}`}
    />
  );
}
