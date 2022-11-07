import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Form } from "../../components";

it("should render a Form component", () => {
  render(<Form />);
  const formComponent = screen.getByTestId("form-1");
  expect(formComponent).toBeInTheDocument();
  expect(formComponent).toHaveStyle("width: 100%", "height: 100%");
});
