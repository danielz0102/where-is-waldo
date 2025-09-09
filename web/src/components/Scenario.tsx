import { useState } from "react";
import waldoImage from "~assets/whereswaldo.jpg";
import CanvasItem from "./CanvasItem";
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
        onClick={handleClick}
        width={800}
        height={600}
        data-testid="scenario"
        style={{
          backgroundImage: `url(${waldoImage})`,
          backgroundSize: "cover",
          cursor: "crosshair",
        }}
      />
      {clickData.show && (
        <CanvasItem x={clickData.x} y={clickData.y}>
          <TargetsMenu />
        </CanvasItem>
      )}
    </>
  );
}
