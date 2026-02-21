import { cx } from "@/lib/utils/cx";

const STICKY_BG: Record<string, string> = {
  rosepink: "#FCEAE5",
  gold: "#FDF3D7",
  jade: "#DFFAF3",
  blush: "#FFF0EC",
  cream: "#FFFBF5",
};

const STICKY_SHADOW: Record<string, string> = {
  rosepink: "rgba(231,111,81,0.18)",
  gold: "rgba(233,196,106,0.22)",
  jade: "rgba(42,157,143,0.15)",
  blush: "rgba(255,221,210,0.25)",
  cream: "rgba(240,230,218,0.3)",
};

type Props = {
  content: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
};

export function StickyNote({ content, color, x, y, rotation }: Props) {
  const bg = STICKY_BG[color] ?? STICKY_BG.gold;
  const shadow = STICKY_SHADOW[color] ?? STICKY_SHADOW.gold;

  return (
    <div
      className={cx(
        "absolute w-[200px] rounded-sm p-5",
        "text-[var(--semantic-text)] text-sm leading-relaxed",
        "transition-shadow duration-200 hover:shadow-lg",
      )}
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        backgroundColor: bg,
        boxShadow: `2px 3px 12px ${shadow}, 0 1px 3px rgba(0,0,0,0.06)`,
      }}
    >
      <div className="pointer-events-none relative">
        <div
          className="absolute -top-3 left-1/2 h-3 w-10 -translate-x-1/2 rounded-sm opacity-30"
          style={{ backgroundColor: STICKY_BG[color] ? `color-mix(in srgb, ${bg} 60%, #000 40%)` : "#C4B898" }}
        />
        <p className="italic opacity-90">{content}</p>
      </div>
    </div>
  );
}
