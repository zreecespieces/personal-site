import type { WorkflowKind } from "../projects";
import WorkflowFigure from "./WorkflowFigure";

function PerlerStage({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <>
        <rect
          x="10"
          y="10"
          width="140"
          height="100"
          fill="none"
          stroke="currentColor"
          opacity="0.5"
        />
        <circle cx="117" cy="34" r="13" fill="currentColor" />
        <path d="M10 110 L60 42 L100 90 L123 62 L150 110 Z" fill="currentColor" opacity="0.6" />
      </>
    );
  }

  return Array.from({ length: 80 }, (_, cell) => {
    const column = cell % 10;
    const row = Math.floor(cell / 10);
    const sun = row < 3 && column > 6 && column < 9;
    const mountain = row >= 2 && Math.abs(column - 3) <= row - 2;
    const foothill = row >= 4 && Math.abs(column - 8) <= row - 4;
    const filled = sun || mountain || foothill;
    return stage === 1 ? (
      <rect
        key={cell}
        x={11 + column * 14}
        y={5 + row * 14}
        width="12"
        height="12"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="0.5"
        opacity={sun ? 1 : filled ? 0.6 : 0.2}
      />
    ) : (
      <circle
        key={cell}
        cx={17 + column * 14}
        cy={11 + row * 14}
        r={filled ? 4.5 : 1}
        fill="none"
        stroke="currentColor"
        strokeWidth={filled ? 3 : 1}
        opacity={sun ? 1 : filled ? 0.6 : 0.25}
      />
    );
  });
}

function KokoroStage({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <>
        <path
          d="M24 8H116L136 28V112H24Z M116 8V28H136"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.5"
        />
        {[
          [82, 55],
          [86, 66],
          [82, 48],
        ].map(([first, second], clause) => (
          <g key={clause} fill="currentColor" opacity={0.45 + clause * 0.25}>
            <rect x="38" y={30 + clause * 26} width={first} height="4" />
            <rect x="38" y={40 + clause * 26} width={second} height="4" />
            <circle cx={44 + second} cy={42 + clause * 26} r="2" />
          </g>
        ))}
      </>
    );
  }

  if (stage === 1) {
    return (
      <>
        <rect
          x="22"
          y="12"
          width="116"
          height="96"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.5"
        />
        {[0, 1, 2, 3].map((corner) => (
          <circle
            key={corner}
            cx={corner % 2 ? 128 : 32}
            cy={corner < 2 ? 22 : 98}
            r="3"
            fill="none"
            stroke="currentColor"
            opacity="0.5"
          />
        ))}
        <path
          d="M60 50H46V38H34 M102 70H118V84 M80 38V26 M60 70H42V86H32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.45"
        />
        <rect x="60" y="38" width="42" height="44" fill="currentColor" opacity="0.12" />
        <rect
          x="60"
          y="38"
          width="42"
          height="44"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[0, 1, 2, 3].map((pin) => (
          <path
            key={pin}
            d={`M54 ${46 + pin * 8}H60 M102 ${46 + pin * 8}H108 M${69 + pin * 8} 32V38 M${69 + pin * 8} 82V88`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
        ))}
        <path d="M71 50H91 M71 60H83 M71 70H88" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="130" y="40" width="14" height="14" fill="currentColor" opacity="0.6" />
        <rect x="130" y="62" width="14" height="14" fill="currentColor" opacity="0.6" />
      </>
    );
  }

  // Three schematic audio chunks echo the three clauses in the input illustration.
  // These fixed shapes are not audio samples or measured performance data.
  return (
    <>
      <rect x="10" y="16" width="140" height="88" fill="none" stroke="currentColor" opacity="0.5" />
      <path d="M16 60H144" stroke="currentColor" opacity="0.2" />
      {[
        [7, 14, 23, 16, 29, 17, 8],
        [6, 22, 31, 18, 26, 11, 4],
        [4, 12, 22, 28, 17, 11, 5],
      ].map((heights, clause) => (
        <g key={clause} fill="currentColor" opacity={0.45 + clause * 0.25}>
          {heights.map((height, bar) => (
            <rect
              key={bar}
              x={19 + clause * 46 + bar * 4.5}
              y={60 - height}
              width="3"
              height={height * 2}
            />
          ))}
        </g>
      ))}
    </>
  );
}

export default function ProjectWorkflow({ kind }: { kind: WorkflowKind }) {
  if (kind === "kokoro-speech") {
    return (
      <WorkflowFigure
        id="speech-process"
        label="Kokoro Pi speech workflow"
        caption={null}
        stages={["Text input", "Speech on the Pi", "Streaming audio"].map((label, stage) => ({
          label,
          illustration: <KokoroStage stage={stage} />,
        }))}
      />
    );
  }

  return (
    <WorkflowFigure
      id="pattern-process"
      stages={["Source image", "Editable pixel grid", "Bead pattern"].map((label, stage) => ({
        label,
        illustration: <PerlerStage stage={stage} />,
      }))}
    />
  );
}
