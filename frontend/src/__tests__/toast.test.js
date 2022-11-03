import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Toast from "../../components/Toast/Toast";

it("should render a Section component", () => {
  render(<Toast />);
  const toastComponent = screen.getByTestId("toast-1");
  expect(toastComponent).toBeInTheDocument();
  expect(toastComponent).toHaveStyle(
    "display: flex",
    "flex-direction: row",
    "align-items: center",
    "gap: 0.5rem",
    "padding: 0.5rem 1rem",
    "border-radius: 0.5rem"
  );
});
