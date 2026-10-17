/* eslint-disable @next/next/no-img-element -- static export, plain SVGs */

/**
 * The app's carved motif in two interlocking rows: one hanging, one standing
 * half a motif along, sliding to the right like the app's background. Same
 * proportions as PatternBackground.swift: the motif is 1/1.2 of the band and
 * neighbours sit 6.5% of a width apart.
 */
export function MotifBand({ height = 220, src = "/art/splash-motif.svg", count = 14 }) {
  const motif = height / 1.2;
  const width = motif * (342 / 424);
  const period = width * 1.065;
  const row = (hanging: boolean) => (
    <div
      className="marquee absolute flex"
      style={
        {
          top: hanging ? 0 : undefined,
          bottom: hanging ? undefined : 0,
          left: -period * 2 + (hanging ? period / 2 : 0),
          gap: period - width,
          "--period": `${period}px`,
          "--duration": `${period / 9}s`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src={src}
          alt=""
          width={width}
          height={motif}
          className={hanging ? "-scale-y-100" : undefined}
          style={{ width, height: motif }}
        />
      ))}
    </div>
  );
  return (
    <div aria-hidden className="pointer-events-none relative overflow-hidden" style={{ height }}>
      {row(true)}
      {row(false)}
    </div>
  );
}
