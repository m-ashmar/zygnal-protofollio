import Reveal from "@/components/site/Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  index,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  index?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "relative mx-auto max-w-2xl text-center" : "relative max-w-2xl"}>
      {index && (
        <span
          className={`ghost-index absolute -top-16 text-[7rem] sm:text-[9rem] ${
            centered ? "left-1/2 -translate-x-1/2" : "-left-1"
          }`}
        >
          {index}
        </span>
      )}

      <Reveal>
        <div
          className={`eyebrow relative flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="rule-draw h-px w-8 origin-left bg-cyan/60" />
          {eyebrow}
          <span className="caret" />
        </div>
      </Reveal>

      <Reveal noBase className="wipe mt-5">
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-[3.25rem]">
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={140}>
          <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
