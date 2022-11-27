import "@testing-library/jest-dom";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import { Modal } from "../../components";
import userEvent from "@testing-library/user-event";

const mockCallBack = jest.fn();

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element) => {
    return element;
  });
});

describe("Modal Component Tests", () => {
  it("Should render a default Modal", () => {
    render(<Modal />);
    const modalComponent = screen.getByTestId("modal-1");
    expect(modalComponent).toBeInTheDocument();
    expect(modalComponent).toHaveTextContent("Test Modal");

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

  it("Should render a custom Modal", () => {
    render(<Modal title={"Modal 1"} onClick={mockCallBack} />);
    const modalComponent = screen.getByText("Modal 1");
    expect(modalComponent).toBeInTheDocument();
  });

  it("Should respond to a click on the X (close) button", async () => {
    render(<Modal title={"Modal 1"} onClick={mockCallBack} />);
    const closeModalButton = screen.getByRole("button");
    expect(closeModalButton).toBeInTheDocument();

    await userEvent.click(closeModalButton);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
