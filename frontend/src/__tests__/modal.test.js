import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Modal } from "../../components";

it("should render a Modal component", () => {
  render(<Modal />);
  const modalComponent = screen.getByTestId("modal-1");
  expect(modalComponent).toBeInTheDocument();
  expect(modalComponent).toHaveStyle(
    "position: fixed",
    "top: 50%",
    "left: 50%",
    "transform: translate(-50%, -50%)",
    "width: 600px",
    "max-width: 100%",
    "max-height: 100%",
    "z-index: 4",
    "background-color: white",
    "border-radius: 15px"
  );
});
