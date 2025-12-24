
export default function ProgressCircle({ value = 62 }: { value?: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="relative w-16 h-16 rounded-full grid place-items-center"
      style={{
        background: `conic-gradient(#22c55e ${clamped * 3.6}deg, #e5e7eb 0deg)`,
      }}
    >
      <div className="absolute w-12 h-12 bg-white rounded-full" />
      <span className="text-sm font-semibold">{clamped}%</span>
    </div>
  );
}