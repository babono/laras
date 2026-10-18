"use client";

/**
 * Web replicas of the app's components, built from the same numbers as the
 * SwiftUI originals (sizes in pt are px here). They are for looking at, not
 * for shipping: the app's components live in Core/UI/Components.swift.
 */

import { useState } from "react";
import { MotifBand } from "./motif-band";
import { ArrowRight, ChevronLeft, Clock, Gear, Help, Minus, Play, Plus, Radio } from "./icons";

type PillStyle = "prominent" | "glass" | "solid" | "wash";

/** The four surfaces, as ButtonSurface draws them in the app. */
const surfaces: Record<PillStyle, string> = {
  prominent: "glass glass-gold text-on-fill",
  glass: "glass text-gold",
  solid: "bg-fill text-on-fill",
  wash: "bg-gold/12 text-gold",
};

export function Pill({
  title,
  style = "wash",
  compact = false,
  disabled = false,
  leading,
  trailing,
}: {
  title: string;
  style?: PillStyle;
  compact?: boolean;
  disabled?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  // Disabled: the gold goes and the type fades; the button itself stays.
  const look = disabled ? (style === "wash" ? "bg-gold/6 text-gold/40" : "glass text-gold/40") : surfaces[style];
  return (
    // The drawn pill can be 38 tall; the target is never under 44.
    <button type="button" disabled={disabled} className="flex min-h-11 items-center">
      <span
        className={`flex items-center rounded-full whitespace-nowrap uppercase ${look} ${
          compact ? "h-[38px] gap-2 px-[18px] text-[14px]" : "h-14 gap-2.5 px-[30px] text-[19px]"
        } font-black tracking-[1.5px]`}
      >
        {leading}
        {title}
        {trailing}
      </span>
    </button>
  );
}

export function SecondaryButton({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex min-h-11 items-center gap-2 rounded-full bg-gold/12 px-[18px] py-[11px] text-[15px] font-black tracking-[1.5px] text-gold"
    >
      {icon}
      {title}
    </button>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold tracking-[2.5px] text-gold uppercase">{children}</p>;
}

function TopBar() {
  return (
    <div className="relative flex w-full min-w-[680px] items-center px-6 pt-[18px] pb-3">
      <button type="button" aria-label="Back" className="glass grid size-11 place-items-center rounded-full text-gold">
        <ChevronLeft className="size-[18px]" />
      </button>
      <h3 className="pointer-events-none absolute inset-x-24 truncate text-center font-display text-[30px] tracking-[1.5px] text-gold uppercase">
        Choose your gangsa
      </h3>
      <div className="ml-auto flex items-center gap-3.5">
        <span className="text-[13px] font-medium text-gold">3 saved</span>
        <button type="button" aria-label="How Kotek works" className="glass grid size-11 place-items-center rounded-full text-gold">
          <Help className="size-[20px]" />
        </button>
        <button type="button" aria-label="Settings" className="glass grid size-11 place-items-center rounded-full text-gold">
          <Gear className="size-[20px]" />
        </button>
      </div>
    </div>
  );
}

function CountStepper() {
  const [value, setValue] = useState(10);
  const [min, max] = [5, 14];
  const circle = (enabled: boolean, onClick: () => void, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      aria-label={label}
      disabled={!enabled}
      onClick={onClick}
      className={`grid size-16 place-items-center rounded-full border-2 ${
        enabled ? "border-gold/75 bg-gold/8 text-gold" : "border-gold/20 text-gold/30"
      }`}
    >
      {icon}
    </button>
  );
  return (
    <div className="flex items-center gap-[22px]">
      {circle(value > min, () => setValue(value - 1), "Fewer keys", <Minus className="size-6" />)}
      <output aria-live="polite" className="min-w-[70px] text-center font-display text-[64px] leading-none text-gold">
        {value}
      </output>
      {circle(value < max, () => setValue(value + 1), "More keys", <Plus className="size-6" />)}
    </div>
  );
}

function Toggle() {
  const [on, setOn] = useState(true);
  return (
    <div className="max-w-[360px]">
      <label className="flex items-center justify-between gap-6 text-[17px] text-gold">
        Top view
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn(!on)}
          className={`relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors ${on ? "bg-gold" : "bg-gold/20"}`}
        >
          <span
            className={`absolute top-[2px] left-[2px] size-[27px] rounded-full bg-white shadow transition-transform ${
              on ? "translate-x-5" : ""
            }`}
          />
        </button>
      </label>
      <p className="mt-2.5 text-[13px] text-gold/75">
        {on ? "Play on the live camera. Realign the keys first." : "Play on the waterfall. No camera needed."}
      </p>
    </div>
  );
}

function Bar({ value, color, height }: { value: number; color: string; height: number }) {
  return (
    <div className="w-full rounded-full bg-card" style={{ height }}>
      <div className="h-full rounded-full" style={{ width: `max(6px, ${value * 100}%)`, background: color }} />
    </div>
  );
}

function ConfirmDialog() {
  return (
    <div className="relative w-full overflow-hidden rounded-kotek bg-black/72 px-7 py-10">
      <div className="mx-auto max-w-[520px] rounded-[22px] border border-gold/12 bg-card p-6 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <h3 className="font-display text-[24px] tracking-[1.5px] text-gold uppercase">Delete this gangsa?</h3>
        <p className="mt-2.5 text-[14px] text-gold/75">
          Its key layout, voice and records go with it. Your other gangsa are not touched.
        </p>
        <div className="mt-3.5 flex justify-end gap-3">
          <Pill title="Cancel" compact />
          <button
            type="button"
            className="flex h-[38px] items-center rounded-full bg-miss/12 px-[18px] text-[14px] font-black tracking-[1.5px] text-miss uppercase"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/** Glass needs something behind it to be glass: the carved motif, as in the app. */
function OverContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid h-44 w-[min(560px,80vw)] place-items-center overflow-hidden rounded-kotek bg-ground">
      <div className="absolute inset-0">
        <MotifBand height={176} count={10} />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function GangsaCard() {
  return (
    <div className="w-[232px] overflow-hidden rounded-[24px] bg-card">
      <div className="grid h-[136px] place-items-center bg-[linear-gradient(160deg,#5a4636,#2a211c)] text-xs tracking-[0.15em] text-gold/50 uppercase">
        Gangsa photo
      </div>
      <div className="p-4">
        <h4 className="font-display text-[34px] leading-[41px] text-gold">Pemade 1</h4>
        <p className="mt-2 text-[15px] leading-5 text-description">Last used 2 days ago</p>
        <p className="text-[15px] leading-5 text-description">
          <span className="font-semibold">80%</span> total accuracy
        </p>
      </div>
    </div>
  );
}

function PatternCard() {
  // Polos on the top four rows, sangsih on the bottom four: a figure's
  // shape, read left to right across one cycle.
  const polos = [0, 1, 3, 2, 0, 1, 3, 2, 0, 1, 3, 2];
  const sangsih = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3];
  return (
    <div className="w-[232px] rounded-[24px] bg-card p-4">
      <h4 className="font-display text-[34px] leading-[41px] text-gold">Ubitan Nyendok</h4>
      <div className="relative mt-3 h-[120px] rounded-[8px] bg-ground/40">
        {polos.map((row, i) => (
          <span key={`p${i}`} className="absolute size-3 rounded-[3px] border border-[#7BA2E4] bg-[#5876AB]" style={{ left: 6 + i * 16, top: 6 + row * 13 }} />
        ))}
        {sangsih.map((row, i) => (
          <span key={`s${i}`} className="absolute size-3 rounded-[3px] border border-[#B391D8] bg-[#8E6AB2]" style={{ left: 6 + i * 16, top: 62 + row * 13 }} />
        ))}
        <span className="absolute top-1.5 bottom-1.5 w-0.5 bg-ground" style={{ left: 69 }} />
      </div>
      <p className="mt-2 text-[15px] leading-5 font-semibold text-gold">96 BPM · best 64%</p>
    </div>
  );
}

function NoteTile({ voice, dim, size = 64 }: { voice: "polos" | "sangsih" | "damp"; dim?: boolean; size?: number }) {
  const look = {
    polos: { fill: dim ? "#313744" : "linear-gradient(#678BC6,#384B76)", border: "#7BA2E4" },
    sangsih: { fill: dim ? "#3F3748" : "linear-gradient(#A281C4,#704A99)", border: "#B391D8" },
    damp: { fill: "linear-gradient(#795E38,#4F3D2A)", border: "#9E7B49" },
  }[voice];
  return (
    <span
      className="grid place-items-center"
      style={{ width: size, height: size, borderRadius: size * 0.22, background: look.fill, border: `3px solid ${look.border}` }}
      aria-label={voice === "damp" ? "Damp" : `${voice}${dim ? ", partner's half" : ""}`}
    >
      {voice === "damp" && <span className="text-[11px] font-semibold text-[#3A2D22]">hand</span>}
    </span>
  );
}

function Key({ state }: { state: "great" | "next" | "miss" | "damped" }) {
  const k = {
    great: { fill: "#79EC90", ring: "#DEFEE5", inner: "#4CC294", text: "#DEFEE5" },
    next: { fill: "#EBB164", ring: "#FFE2B6", inner: "#C2975A", text: "#FFE2B6" },
    miss: { fill: "#8F303B", ring: "#B43D54", inner: "#BD5267", text: "#2B211C" },
    damped: { fill: "#59482E", ring: "#2B211C", inner: "#7B5F39", text: "#2B211C" },
  }[state];
  return (
    <div className="grid justify-items-center gap-2">
      <div
        className="relative grid h-[136px] w-[64px] place-items-center rounded-[20px] p-[5px]"
        style={{ background: k.ring, boxShadow: `0 0 0 4px ${k.ring}55` }}
      >
        <div className="grid size-full place-items-center rounded-[16px]" style={{ background: k.fill }}>
          <div className="relative grid h-[108px] w-[28px] place-items-center rounded-[12px]" style={{ background: k.inner }}>
            <span className="absolute top-2.5 size-2.5 rounded-full bg-[#2B211C]" />
            <span className="text-[20px] font-black" style={{ color: k.text }}>10</span>
            <span className="absolute bottom-2.5 size-2.5 rounded-full bg-[#2B211C]" />
          </div>
        </div>
      </div>
      <span className="text-xs capitalize">{state}</span>
    </div>
  );
}

function Verdict({ kind }: { kind: "great" | "miss" }) {
  const c = kind === "great" ? "#79EC90" : "#BD5267";
  return (
    <span
      className="rounded-md px-3 pt-6 pb-1.5 text-[15px] font-bold"
      style={{ color: c, background: `linear-gradient(to top, ${c}55, transparent)` }}
    >
      {kind === "great" ? "Great" : "Miss"}
    </span>
  );
}

/** One preview per component variant, by `${slug}/${variant}`. */
export function Preview({ id }: { id: string }) {
  switch (id) {
    case "button/prominent":
      return (
        <OverContent>
          <Pill title="Start practice" style="prominent" leading={<Play className="size-[18px]" />} />
        </OverContent>
      );
    case "button/glass":
      return (
        <OverContent>
          <div className="flex items-center gap-3.5">
            <button type="button" aria-label="Back" className="glass grid size-11 place-items-center rounded-full text-gold">
              <ChevronLeft className="size-[18px]" />
            </button>
            <button type="button" className="glass flex h-11 items-center gap-2.5 rounded-full px-6 text-[16px] font-semibold text-gold">
              Create kotek <Plus className="size-4" />
            </button>
          </div>
        </OverContent>
      );
    case "button/solid":
      return <Pill title="Set up · 4 steps" style="solid" />;
    case "button/wash":
      return (
        <div className="flex gap-3">
          <Pill title="Coop" />
          <Pill title="Cancel" compact />
        </div>
      );
    case "button/disabled":
      return (
        <OverContent>
          <Pill title="Next" style="prominent" compact disabled />
        </OverContent>
      );
    case "secondary-button/default":
      return <SecondaryButton title="Connect controller" icon={<Radio className="size-[17px]" />} />;
    case "secondary-button/row":
      return (
        <div className="flex flex-wrap gap-2.5">
          <SecondaryButton title="Switch gangsa" icon={<ArrowRight className="size-[17px]" />} />
          <SecondaryButton title="History" icon={<Clock className="size-[17px]" />} />
        </div>
      );
    case "top-bar/default":
      return <TopBar />;
    case "section-label/default":
      return (
        <div className="space-y-2.5">
          <SectionLabel>Strike controller</SectionLabel>
          <p className="max-w-[520px] text-[14px] text-gold/62">
            Optional. Piezo sensors on the bilah feel exactly which key you hit and when.
          </p>
        </div>
      );
    case "count-stepper/default":
      return <CountStepper />;
    case "toggle/default":
      return <Toggle />;
    case "loading-bar/default":
      return (
        <div className="w-60" role="progressbar" aria-label="Loading" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
          <Bar value={0.65} color="var(--progress)" height={5} />
        </div>
      );
    case "loading-bar/dark":
      return (
        <div className="w-60">
          <Bar value={0.65} color="#1C1612" height={5} />
        </div>
      );
    case "card/gangsa":
      return <GangsaCard />;
    case "card/pattern":
      return <PatternCard />;
    case "note-tile/voices":
      return (
        <div className="grid grid-cols-2 gap-4">
          <NoteTile voice="sangsih" />
          <NoteTile voice="polos" />
          <NoteTile voice="sangsih" dim />
          <NoteTile voice="polos" dim />
        </div>
      );
    case "note-tile/damp":
      return <NoteTile voice="damp" />;
    case "key-state/keys":
      return (
        <div className="flex gap-6">
          <Key state="great" />
          <Key state="next" />
          <Key state="miss" />
          <Key state="damped" />
        </div>
      );
    case "key-state/verdicts":
      return (
        <div className="flex gap-3">
          <Verdict kind="great" />
          <Verdict kind="miss" />
        </div>
      );
    case "stat-bar/default":
      return (
        <div className="w-full max-w-sm space-y-4">
          {[
            ["Polos", 0.86, "#5FA8D3"],
            ["Sangsih", 0.62, "#A97CD1"],
            ["Hits", 0.74, "#7FB069"],
          ].map(([label, value, color]) => (
            <div key={label as string} className="grid grid-cols-[72px_1fr] items-center gap-3 text-[13px] text-gold">
              {label}
              <Bar value={value as number} color={color as string} height={7} />
            </div>
          ))}
        </div>
      );
    case "confirm-dialog/default":
      return <ConfirmDialog />;
    default:
      return null;
  }
}
