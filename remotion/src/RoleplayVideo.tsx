import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { type RoleplayData } from "./data";

const TITLE_DURATION = 90; // 3 seconds
const LINE_DURATION = 100; // ~3.3 seconds per line

export const RoleplayVideo: React.FC<{ data: RoleplayData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${data.bgColor1}, ${data.bgColor2})`,
        }}
      />

      {/* Floating decorative circles */}
      <FloatingCircles frame={frame} fps={fps} color1={data.bgColor1} />

      {/* Title sequence */}
      <Sequence durationInFrames={TITLE_DURATION}>
        <TitleScene data={data} />
      </Sequence>

      {/* Dialogue lines */}
      {data.lines.map((line, i) => (
        <Sequence
          key={i}
          from={TITLE_DURATION + i * LINE_DURATION}
          durationInFrames={LINE_DURATION}
        >
          <DialogueScene
            line={line}
            speakerA={data.speakerA}
            speakerB={data.speakerB}
            lineIndex={i}
          />
        </Sequence>
      ))}

      {/* End card */}
      <Sequence from={TITLE_DURATION + data.lines.length * LINE_DURATION}>
        <EndCard data={data} />
      </Sequence>
    </AbsoluteFill>
  );
};

const FloatingCircles: React.FC<{
  frame: number;
  fps: number;
  color1: string;
}> = ({ frame, color1 }) => {
  const circles = [
    { x: 15, y: 20, size: 120, speed: 0.8 },
    { x: 75, y: 70, size: 80, speed: 1.2 },
    { x: 50, y: 40, size: 150, speed: 0.5 },
    { x: 85, y: 15, size: 60, speed: 1.5 },
  ];

  return (
    <>
      {circles.map((c, i) => {
        const y = c.y + Math.sin(frame * 0.02 * c.speed + i) * 8;
        const x = c.x + Math.cos(frame * 0.015 * c.speed + i * 2) * 5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background: color1,
              opacity: 0.15,
            }}
          />
        );
      })}
    </>
  );
};

const TitleScene: React.FC<{ data: RoleplayData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });
  const emojiScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8 },
  });
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          fontSize: 120,
          transform: `scale(${emojiScale})`,
        }}
      >
        {data.emoji}
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          transform: `scale(${titleScale})`,
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          fontFamily: "sans-serif",
          padding: "0 40px",
        }}
      >
        {data.title}
      </div>
      <div
        style={{
          fontSize: 32,
          color: "rgba(255,255,255,0.85)",
          opacity: subtitleOpacity,
          fontFamily: "sans-serif",
          fontWeight: 600,
        }}
      >
        🎭 Roleplay en català
      </div>
    </AbsoluteFill>
  );
};

const DialogueScene: React.FC<{
  line: { speaker: "A" | "B"; text: string; emoji?: string };
  speakerA: { name: string; emoji: string; color: string };
  speakerB: { name: string; emoji: string; color: string };
  lineIndex: number;
}> = ({ line, speakerA, speakerB, lineIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const speaker = line.speaker === "A" ? speakerA : speakerB;
  const isLeft = line.speaker === "A";

  const bubbleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 150 } });
  const bubbleX = interpolate(bubbleSpring, [0, 1], [isLeft ? -400 : 400, 0]);
  const bubbleOpacity = interpolate(bubbleSpring, [0, 1], [0, 1]);

  const emojiPop = spring({
    frame: frame - 15,
    fps,
    config: { damping: 8 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: isLeft ? "flex-start" : "flex-end",
        padding: "0 80px",
      }}
    >
      {/* Speaker avatar */}
      <div
        style={{
          position: "absolute",
          top: 80,
          [isLeft ? "left" : "right"]: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: bubbleOpacity,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: speaker.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          {speaker.emoji}
        </div>
        <span
          style={{
            color: "white",
            fontWeight: 800,
            fontSize: 24,
            fontFamily: "sans-serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {speaker.name}
        </span>
      </div>

      {/* Speech bubble */}
      <div
        style={{
          transform: `translateX(${bubbleX}px)`,
          opacity: bubbleOpacity,
          background: "white",
          borderRadius: 30,
          padding: "40px 50px",
          maxWidth: "70%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          marginTop: 100,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#2D3436",
            fontFamily: "sans-serif",
            lineHeight: 1.4,
          }}
        >
          {line.text}
        </div>
        {line.emoji && (
          <div
            style={{
              fontSize: 64,
              marginTop: 16,
              transform: `scale(${emojiPop})`,
              display: "inline-block",
            }}
          >
            {line.emoji}
          </div>
        )}
      </div>

      {/* Line counter */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          color: "rgba(255,255,255,0.6)",
          fontSize: 20,
          fontFamily: "sans-serif",
          fontWeight: 600,
        }}
      >
        {lineIndex + 1} / 7
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC<{ data: RoleplayData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 80 }}>🎉</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            fontFamily: "sans-serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          Molt bé!
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "sans-serif",
            fontWeight: 600,
            marginTop: 10,
          }}
        >
          Ara practica amb un company! 👥
        </div>
      </div>
    </AbsoluteFill>
  );
};
