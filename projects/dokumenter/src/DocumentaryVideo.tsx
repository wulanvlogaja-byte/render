import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { DocumentaryProps } from "./types";
import { CinematicOverlays } from "./components/CinematicOverlays";
import { KenBurnsMedia, LowerThird } from "./components/DocumentaryElements";

const { fontFamily: serifFont } = loadPlayfair();
const { fontFamily: sansFont } = loadInter();

export const SCENE_DURATIONS = {
  intro: 150,
  location: 180,
  quote: 150,
  outro: 150,
  transition: 30,
};

export const TOTAL_DOCUMENTARY_FRAMES =
  SCENE_DURATIONS.intro +
  SCENE_DURATIONS.location +
  SCENE_DURATIONS.quote +
  SCENE_DURATIONS.outro -
  SCENE_DURATIONS.transition * 3; // 540 frames (18 detik @ 30fps)

const IntroScene: React.FC<DocumentaryProps> = ({
  title,
  subtitle,
  chapterLabel,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [15, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleSpacing = interpolate(frame, [10, 90], [0.22, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineWidth = spring({
    frame: frame - 35,
    fps,
    config: { damping: 30, stiffness: 90 },
  });

  return (
    <AbsoluteFill>
      <KenBurnsMedia direction="zoom-in" variant="mist" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            fontFamily: sansFont,
            fontSize: 18,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: accentColor,
            opacity: titleOpacity,
            marginBottom: 22,
          }}
        >
          {chapterLabel}
        </div>

        <h1
          style={{
            fontFamily: serifFont,
            fontSize: 88,
            fontWeight: 700,
            color: "#f8f8f8",
            margin: 0,
            letterSpacing: `${titleSpacing}em`,
            opacity: titleOpacity,
            textShadow: "0 10px 40px rgba(0,0,0,0.7)",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            width: `${lineWidth * 180}px`,
            height: 2,
            backgroundColor: accentColor,
            margin: "28px auto",
          }}
        />

        <p
          style={{
            fontFamily: sansFont,
            fontSize: 26,
            color: "rgba(255,255,255,0.78)",
            letterSpacing: "0.08em",
            margin: 0,
            opacity: interpolate(frame, [45, 75], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LocationScene: React.FC<DocumentaryProps> = ({
  scene2Image,
  locationName,
  locationDetail,
  yearLabel,
  accentColor,
}) => {
  return (
    <AbsoluteFill>
      <KenBurnsMedia
        imagePath={scene2Image}
        direction="pan-right"
        variant="amber"
      />
      <LowerThird
        title={locationName}
        subtitle={locationDetail}
        year={yearLabel}
        accentColor={accentColor}
        serifFont={serifFont}
        sansFont={sansFont}
      />
    </AbsoluteFill>
  );
};

const QuoteScene: React.FC<DocumentaryProps> = ({
  scene3Image,
  quoteText,
  quoteAuthor,
  accentColor,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [18, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [18, 55], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <KenBurnsMedia
        imagePath={scene3Image}
        direction="zoom-out"
        variant="mist"
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.42)" }} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 220px",
          textAlign: "center",
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 72,
            color: accentColor,
            lineHeight: 0.6,
            marginBottom: 24,
          }}
        >
          “
        </div>
        <blockquote
          style={{
            fontFamily: serifFont,
            fontSize: 44,
            fontStyle: "italic",
            lineHeight: 1.45,
            color: "#f2f2f2",
            margin: 0,
          }}
        >
          {quoteText}
        </blockquote>
        <div
          style={{
            fontFamily: sansFont,
            fontSize: 18,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: accentColor,
            marginTop: 34,
          }}
        >
          — {quoteAuthor}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC<DocumentaryProps> = ({
  statNumber,
  statSuffix,
  statCaption,
  closingText,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 40, stiffness: 60 },
  });
  const currentNumber = Math.round(statNumber * countProgress);

  const fadeOut = interpolate(frame, [115, 148], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#060709", opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 180px",
        }}
      >
        <div
          style={{
            fontFamily: serifFont,
            fontSize: 130,
            fontWeight: 700,
            color: accentColor,
            lineHeight: 1,
          }}
        >
          {currentNumber.toLocaleString("id-ID")}
          {statSuffix}
        </div>

        <p
          style={{
            fontFamily: sansFont,
            fontSize: 28,
            color: "#e6e6e6",
            maxWidth: 900,
            lineHeight: 1.5,
            marginTop: 24,
          }}
        >
          {statCaption}
        </p>

        <div
          style={{
            fontFamily: sansFont,
            fontSize: 16,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginTop: 64,
          }}
        >
          {closingText}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DocumentaryVideo: React.FC<DocumentaryProps> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <IntroScene {...props} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_DURATIONS.transition })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.location}>
          <LocationScene {...props} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_DURATIONS.transition })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.quote}>
          <QuoteScene {...props} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: SCENE_DURATIONS.transition })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
          <OutroScene {...props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <CinematicOverlays accentColor={props.accentColor} />
    </AbsoluteFill>
  );
};
