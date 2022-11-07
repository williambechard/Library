import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Card } from "../../components";

it("should render a Card component", () => {
  render(<Card />);
  const cardComponent = screen.getByTestId("card-1");
  expect(cardComponent).toBeInTheDocument();
  expect(cardComponent).toHaveStyle(
    "padding: 20px 10px",
    "margin: 10px",
    "background-color: #bfbfbf",
    "width: 100px",
    "height: 150px",
    "box-shadow: 5px 5px 10px #a9a9a9"
  );
});
