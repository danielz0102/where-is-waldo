import { useState } from "react";
import waldoImage from "~assets/whereswaldo.jpg";
import TargetBox from "./TargetBox";
import TargetsMenu from "./TargetsMenu";

export default function Scenario() {
  const [clickData, setClickData] = useState({ show: false, x: 0, y: 0 });

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setClickData(({ show }) => ({
      show: !show,
      x: event.clientX,
      y: event.clientY,
    }));
  };

  return (
    <>
      <canvas
        role="img"
        aria-label="Where's Waldo scenario"
        onClick={handleClick}
        width={800}
        height={600}
        style={{
          backgroundImage: `url(${waldoImage})`,
          backgroundSize: "cover",
          cursor: "crosshair",
        }}
      />
      {clickData.show && (
        <>
          <CanvasItem x={clickData.x + 40} y={clickData.y - 50}>
            <TargetsMenu />
          </CanvasItem>
          <CanvasItem x={clickData.x - 30} y={clickData.y - 30}>
            <TargetBox />
          </CanvasItem>
        </>
      )}
    </>
  );
}

interface CanvasItemProps {
  x: number;
  y: number;
  children: React.ReactNode;
}

function CanvasItem({ x, y, children }: CanvasItemProps) {
  return (
    <div style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}>
      {children}
    </div>
  );
}
