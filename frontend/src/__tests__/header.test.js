import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header/Header";

it("should render a Header component", () => {
  render(<Header />);
  const headerComponent = screen.getByTestId("header-1");
  expect(headerComponent).toBeInTheDocument();
  expect(headerComponent).toHaveStyle(
    "display:flex",
    "display: inline-block",
    "margin: auto 10px",
    "font-size: 1rem",
    `@media screen and (min-width: 300px) {
    font-size: 1.5rem;
    }`,
    `@media screen and (min-width: 800px) {
    font-size: 2rem;
    }`,
    "font-weight: bold",
    "color: ${colors.fColor}",
    "font-family: Poppins, serif"
  );
});
