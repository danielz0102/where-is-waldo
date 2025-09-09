import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CanvasItemProps } from "~components/CanvasItem";
import Scenario from "~components/Scenario";

vi.mock("~components/TargetsMenu", () => ({
  default: () => <div data-testid="targets-menu"></div>,
}));

vi.mock("~components/CanvasItem", () => ({
  default: ({ children, x, y }: CanvasItemProps) => (
    <div data-testid="canvas-item" data-x={x} data-y={y}>
      {children}
    </div>
  ),
}));

test("passes correct position to CanvasItem when clicked", async () => {
  const user = userEvent.setup();
  render(<Scenario />);

  const canvas = screen.getByTestId("scenario");
  await user.pointer([
    { target: canvas, coords: { x: 50, y: 100 }, keys: "[MouseLeft]" },
    { keys: "[/MouseLeft]" },
  ]);

  const canvasItem = screen.getByTestId("canvas-item");
  expect(canvasItem).toHaveAttribute("data-x", "50");
  expect(canvasItem).toHaveAttribute("data-y", "100");
});

test("hides CanvasItem when clicked again", async () => {
  const user = userEvent.setup();
  render(<Scenario />);
  const canvas = screen.getByTestId("scenario");
  await user.click(canvas);

  const canvasItem = screen.getByTestId("canvas-item");
  await user.click(canvas);

  expect(canvasItem).not.toBeInTheDocument();
});

test("renders TargetsMenu inside CanvasItem when menu is open", async () => {
  const user = userEvent.setup();
  render(<Scenario />);
  const canvas = screen.getByTestId("scenario");

  await user.click(canvas);
  const canvasItem = screen.getByTestId("canvas-item");

  const menu = within(canvasItem).getByTestId("targets-menu");
  expect(menu).toBeVisible();
});
