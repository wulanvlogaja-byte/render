import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const KenBurnsMedia: React.FC<{
  imagePath?: string;
  direction?: "zoom-in" | "zoom-out" | "pan-right";
  variant?: "mist" | "amber";
}> = ({ imagePath, direction = "zoom-in", variant = "mist" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale =
    direction === "zoom-in"
      ? interpolate(progress, [0, 1], [1.0, 1.14])
      : direction === "zoom-out"
      ? interpolate(progress, [0, 1], [1.14, 1.0])
      : 1.1;

  const translateX =
    direction === "pan-right"
      ? interpolate(progress, [0, 1], [-30, 30])
      : interpolate(progress, [0, 1], [-8, 8]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0a0c10" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${translateX}px)`,
          filter: "contrast(1.08) saturate(0.75) brightness(0.68)",
        }}
      >
        {imagePath ? (
          <Img
            src={staticFile(imagePath)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <AbsoluteFill
            style={{
              background:
                variant === "mist"
                  ? "radial-gradient(ellipse at 30% 40%, #243447 0%, #10161e 55%, #07090c 100%)"
                  : "radial-gradient(ellipse at 65% 45%, #3d2c1e 0%, #171311 55%, #080706 100%)",
            }}
          >
            <svg
              viewBox="0 0 1920 1080"
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100%",
                opacity: 0.45,
              }}
            >
              <path
                d="M0,780 Q320,620 640,710 T1280,660 T1920,740 L1920,1080 L0,1080 Z"
                fill="#0b0f14"
              />
              <path
                d="M0,850 Q480,730 960,820 T1920,790 L1920,1080 L0,1080 Z"
                fill="#050709"
              />
            </svg>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const LowerThird: React.FC<{
  title: string;
  subtitle: string;
  year: string;
  accentColor: string;
  serifFont: string;
  sansFont: string;
}> = ({ title, subtitle, year, accentColor, serifFont, sansFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - 15,
    fps,
    config: { damping: 24, stiffness: 110 },
  });

  const lineHeight = interpolate(enter, [0, 1], [0, 86]);
  const textOpacity = interpolate(frame, [22, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textTranslateX = interpolate(enter, [0, 1], [-24, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        bottom: 145,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          width: 4,
          height: lineHeight,
          backgroundColor: accentColor,
          boxShadow: `0 0 18px ${accentColor}66`,
        }}
      />
      <div
        style={{
          opacity: textOpacity,
          transform: `translateX(${textTranslateX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: sansFont,
            fontSize: 16,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          {year}
        </div>
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 42,
            color: "#f5f5f5",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: sansFont,
            fontSize: 20,
            color: "rgba(255,255,255,0.72)",
            marginTop: 4,
            letterSpacing: "0.04em",
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};
