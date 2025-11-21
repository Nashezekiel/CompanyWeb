import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

type LogoNodeItem = { node: ReactNode; title?: string; href?: string; ariaLabel?: string };
type LogoImageItem = { src: string; alt?: string; title?: string; href?: string; srcSet?: string; sizes?: string; width?: number; height?: number };
export type LogoItem = LogoNodeItem | LogoImageItem;

export type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const toCssLength = (value: number | string | undefined) => (typeof value === "number" ? `${value}px` : value ?? undefined);

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const offsetRef = useRef(0);

  // Measure one full sequence width
  const measure = useCallback(() => {
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // JS animation disabled – movement is handled via CSS keyframes on .logoloop-track
  useEffect(() => {
    return;
  }, []);

  const rootStyle = useMemo(
    () => ({
      width: toCssLength(width) ?? "100%",
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      // Derive a CSS animation duration from speed (higher speed -> shorter duration)
      "--logoloop-duration": `${Math.max(10, 3200 / Math.max(10, Math.abs(speed || 1)))}s`,
      ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      ...style,
    }) as CSSProperties,
    [width, gap, logoHeight, fadeOutColor, style, speed],
  );

  const rootClasses = cx(
    "logoloop",
    direction === "right" ? "logoloop--right" : "logoloop--left",
    pauseOnHover && "logoloop--pause",
    "relative overflow-x-hidden group",
    "[--logoloop-gap:32px]",
    "[--logoloop-logoHeight:28px]",
    "[--logoloop-fadeColorAuto:#ffffff]",
    "dark:[--logoloop-fadeColorAuto:#0b0b0b]",
    scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
    className,
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setHovered(false);
  }, [pauseOnHover]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: string) => {
      const isNodeItem = (item as any).node !== undefined;

      const content = isNodeItem ? (
        <span
          className={cx(
            "inline-flex items-center",
            "motion-reduce:transition-none",
            scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120",
          )}
          aria-hidden={(item as any).href ? true : false}
        >
          {(item as any).node as ReactNode}
        </span>
      ) : (
        <img
          className={cx(
            "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
            "[-webkit-user-drag:none] pointer-events-none",
            "[image-rendering:-webkit-optimize-contrast]",
            "motion-reduce:transition-none",
            scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120",
          )}
          src={(item as any).src}
          srcSet={(item as any).srcSet}
          sizes={(item as any).sizes}
          width={(item as any).width}
          height={(item as any).height}
          alt={(item as any).alt ?? ""}
          title={(item as any).title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const itemAriaLabel = isNodeItem
        ? (item as any).ariaLabel ?? (item as any).title
        : (item as any).alt ?? (item as any).title;

      const inner = (item as any).href ? (
        <a
          className={cx(
            "inline-flex items-center no-underline rounded",
            "transition-opacity duration-200 ease-linear",
            "hover:opacity-80",
            "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2",
          )}
          href={(item as any).href}
          aria-label={itemAriaLabel || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li
          key={key}
          role="listitem"
          className={cx(
            "flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]",
            scaleOnHover && "overflow-visible group/item",
          )}
        >
          {inner}
        </li>
      );
    },
    [scaleOnHover],
  );

  const sequence = useMemo(
    () => (
      <ul ref={seqRef} role="list" className="flex items-center">
        {logos.map((item, index) => renderLogoItem(item, `0-${index}`))}
      </ul>
    ),
    [logos, renderLogoItem],
  );

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={rootStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className={cx(
              "pointer-events-none absolute inset-y-0 left-0 z-[1]",
              "w-[clamp(24px,8%,120px)]",
              "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]",
            )}
          />
          <div
            aria-hidden
            className={cx(
              "pointer-events-none absolute inset-y-0 right-0 z-[1]",
              "w-[clamp(24px,8%,120px)]",
              "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]",
            )}
          />
        </>
      )}

      <div
        ref={trackRef}
        className={cx(
          "logoloop-track flex w-max select-none",
          "motion-reduce:transform-none",
        )}
      >
        {sequence}
        {sequence}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

function baseSpeedKey(speed: number, direction: "left" | "right") {
  return `${speed}:${direction}`;
}

export default LogoLoop;
