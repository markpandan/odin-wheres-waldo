import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App Component", () => {
  // check if App components renders headline
  it("renders headline", () => {
    render(<App />);

    // screen.debug();
  });

  it("renders correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch("Vite + React");
  });

  it("count was initialized to 0", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("increments the count after button click", async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", { name: "count is 0" });

    await user.click(button);

    expect(screen.getByRole("button").textContent).toMatch("count is 1");
  });
});
