"use client";

/**
 * Web replicas of the app's components, built from the same numbers as the
 * SwiftUI originals (sizes in pt are px here). They are for looking at, not
 * for shipping: the app's components live in Core/UI/Components.swift.
 */

import { useState } from "react";
import { ArrowRight, ChevronLeft, Clock, Gear, Help, Minus, Play, Plus, Radio } from "./icons";

type PillStyle = "filled" | "outlined" | "secondary";

export function Pill({
  title,
  style = "outlined",
  compact = false,
  leading,
  trailing,
}: {
  title: string;
  style?: PillStyle;
  compact?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  const look = {
    filled: "bg-fill text-on-fill",
    outlined: "border border-gold bg-gold/8 text-gold backdrop-blur",
    secondary: "bg-card text-gold",
  }[style];
  return (
    // The drawn pill can be 38 tall; the target is never under 44.
    <button type="button" className="flex min-h-11 items-center">
      <span
        className={`flex items-center rounded-kotek whitespace-nowrap uppercase ${look} ${
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
      className="flex min-h-11 items-center gap-2 rounded-kotek border border-gold/45 bg-gold/8 px-[18px] py-[11px] text-[15px] font-black tracking-[1.5px] text-gold"
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
      <button type="button" className="flex min-h-11 items-center gap-1 text-[16px] text-gold">
        <ChevronLeft className="size-[18px]" />
        Back
      </button>
      <h3 className="pointer-events-none absolute inset-x-24 truncate text-center font-display text-[30px] tracking-[1.5px] text-gold uppercase">
        Choose your gangsa
      </h3>
      <div className="ml-auto flex items-center gap-3.5">
        <span className="text-[13px] font-medium text-gold">3 saved</span>
        <button type="button" aria-label="How Kotek works" className="grid size-11 place-items-center text-gold">
          <Help className="size-[22px]" />
        </button>
        <button type="button" aria-label="Settings" className="grid size-11 place-items-center text-gold">
          <Gear className="size-[22px]" />
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
            className="flex h-[38px] items-center rounded-kotek border-[1.5px] border-miss/60 px-[18px] text-[14px] font-black tracking-[1.5px] text-miss uppercase"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/** One preview per component variant, by `${slug}/${variant}`. */
export function Preview({ id }: { id: string }) {
  switch (id) {
    case "button/filled":
      return <Pill title="Start practice" style="filled" leading={<Play className="size-[18px]" />} />;
    case "button/outlined":
      return <Pill title="Next" trailing={<ArrowRight className="size-4" />} />;
    case "button/secondary":
      return <Pill title="Retry" style="secondary" />;
    case "button/compact":
      return <Pill title="Cancel" compact />;
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
