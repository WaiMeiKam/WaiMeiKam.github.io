import { cx } from "@/lib/utils/cx";
import { IllustrationSpot } from "@/components/illustrations/IllustrationSpot";

type Props = {
  type: "video" | "image" | "embed" | "link";
  title: string;
  thumbnail?: string;
  link?: string | null;
  embedUrl?: string;
  x: number;
  y: number;
  rotation: number;
  width?: number;
};

const TYPE_ICONS: Record<string, string> = {
  video: "▶",
  image: "🖼",
  embed: "♫",
  link: "↗",
};

const TYPE_LABELS: Record<string, string> = {
  video: "Video",
  image: "Image",
  embed: "Embed",
  link: "Link",
};

export function CanvasCard({
  type,
  title,
  thumbnail,
  link,
  x,
  y,
  rotation,
  width = 240,
}: Props) {
  const href = link && link !== "#" ? link : undefined;
  const Tag = href ? "a" : "div";

  const linkProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer", draggable: false }
    : {};

  return (
    <Tag
      {...linkProps}
      className={cx(
        "absolute block overflow-hidden rounded-[var(--radius-lg)]",
        "bg-[var(--semantic-surface)] shadow-[var(--shadow-sm)]",
        "ring-1 ring-black/5",
        "transition-[transform,box-shadow] duration-200",
        href && "hover:shadow-[var(--shadow-md)] hover:ring-black/10",
      )}
      style={{
        left: x,
        top: y,
        width,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {thumbnail && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/3">
          <IllustrationSpot
            name={thumbnail}
            alt=""
            width={width * 2}
            height={Math.round(width * 2 * 0.625)}
            className="!rounded-none"
          />
          {type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md">
                <span className="ml-0.5 text-sm text-[var(--semantic-heading)]">▶</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="px-4 py-3">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="text-xs opacity-50">{TYPE_ICONS[type]}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-40">
            {TYPE_LABELS[type]}
          </span>
        </div>
        <p className="text-sm font-medium leading-snug text-[var(--semantic-heading)]">
          {title}
        </p>
      </div>
    </Tag>
  );
}
