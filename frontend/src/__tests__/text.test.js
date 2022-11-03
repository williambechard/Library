import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Text from "../../components/Text/Text";

it("should render a Section component", () => {
  render(<Text />);
  const textComponent = screen.getByTestId("text-1");
  expect(textComponent).toBeInTheDocument();
  expect(textComponent).toHaveStyle(
    "display: inline-block",
    "font-size: 1rem",
    `@media screen and (min-width: 300px) {
    font-size: 1.5rem;
  }`,
    `@media screen and (min-width: 800px) {
    font-size: 2rem;
  }`,
    "font-weight: bold",
    "font-family: Poppins, serif"
  );
});
