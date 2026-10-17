"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // Clipboard blocked (insecure origin, permissions): the value is on screen anyway.
        }
      }}
      className="font-mono text-sm text-gold hover:underline"
      aria-label={`Copy ${label ?? value}`}
    >
      {copied ? "Copied" : value}
    </button>
  );
}
