import { Crosshair } from "lucide-react";

export default function TargetBox() {
  return (
    <div className="rounded-full border-4 border-red-400 border-dashed bg-neutral-700/70 p-4">
      <Crosshair color="oklch(70.4% 0.191 22.216)" />
    </div>
  );
}
