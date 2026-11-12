import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";

export const CinematicOverlays: React.FC<{
  showLetterbox?: boolean;
  accentColor?: string;
}> = ({ showLetterbox = true, accentColor = "#d4af37" }) => {
  const frame = useCurrentFrame();

  const barHeight = showLetterbox
    ? interpolate(frame, [0, 30], [0, 96], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const grainX = Math.floor(random(`gx-${frame}`) * 100);
  const grainY = Math.floor(random(`gy-${frame}`) * 100);

  const particles = Array.from({ length: 18 }).map((_, i) => {
    const baseX = random(`px-${i}`) * 1920;
    const baseY = random(`py-${i}`) * 1080;
    const size = 2 + random(`ps-${i}`) * 3.5;
    const speedY = 0.25 + random(`vy-${i}`) * 0.6;
    const driftX = Math.sin(frame * 0.02 + i) * 18;
    const y = (baseY - frame * speedY + 1080) % 1080;
    const opacity = 0.12 + random(`po-${i}`) * 0.28;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: baseX + driftX,
          top: y,
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: i % 4 === 0 ? accentColor : "#ffffff",
          opacity,
          filter: "blur(0.8px)",
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Partikel Debu Atmosferik */}
      <AbsoluteFill>{particles}</AbsoluteFill>

      {/* Vignette Gelap di Pinggiran Frame */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Film Grain 35mm Prosedural */}
      <AbsoluteFill
        style={{
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundPosition: `${grainX}px ${grainY}px`,
        }}
      />

      {/* Letterbox Anamorphic 2.39:1 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: "#050505",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: barHeight,
          backgroundColor: "#050505",
        }}
      />
    </AbsoluteFill>
  );
};
