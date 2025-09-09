import { render, screen } from "@testing-library/react";
import CanvasItem from "~components/CanvasItem";

test("renders child on the coordinates given", () => {
  render(
    <CanvasItem x={10} y={20}>
      <div>Test</div>
    </CanvasItem>
  );

  const child = screen.getByText("Test");
  expect(child).toBeInTheDocument();

  if (!child.parentElement) {
    throw new Error("Child has no parent element");
  }

  const styles = window.getComputedStyle(child.parentElement);
  expect(styles.position).toBe("absolute");
  expect(styles.top).toBe("20px");
  expect(styles.left).toBe("10px");
});
