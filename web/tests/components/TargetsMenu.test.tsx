import { render, screen, within } from "@testing-library/react";
import TargetsMenu from "~components/TargetsMenu";

test("has the Waldo button", () => {
  const waldoItem = queryItem("Waldo");

  expect(waldoItem).toBeDefined();
});

test("has the Wizard button", () => {
  const wizardItem = queryItem("Wizard");

  expect(wizardItem).toBeDefined();
});

test("has the Odlaw button", () => {
  const odlawItem = queryItem("Odlaw");

  expect(odlawItem).toBeDefined();
});

function queryItem(itemName: string) {
  render(<TargetsMenu />);

  const menu = screen.getByRole("menu");
  const items = within(menu).getAllByRole("button");

  return items.find((item) => within(item).queryByText(itemName));
}
