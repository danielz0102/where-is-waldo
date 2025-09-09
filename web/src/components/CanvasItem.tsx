export interface CanvasItemProps {
  x: number;
  y: number;
  children: React.ReactNode;
}

export default function CanvasItem({ x, y, children }: CanvasItemProps) {
  return (
    <div style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}>
      {children}
    </div>
  );
}
