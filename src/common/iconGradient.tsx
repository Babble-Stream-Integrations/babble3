export default function IconGradient(
  title: string,
  startColor: string,
  endColor: string,
  [x1, y1, x2, y2]: [number, number, number, number]
) {
  return (
    <svg width="0" height="0" className="absolute">
      <linearGradient
        id={`gradient-${title}`}
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
      >
        <stop stopColor={startColor} offset="0%" />
        <stop stopColor={endColor} offset="100%" />
      </linearGradient>
    </svg>
  );
}
