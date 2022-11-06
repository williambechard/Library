import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Banner } from "../../components";

it("should render a Banner component", () => {
  render(<Banner />);
  const bannerComponent = screen.getByTestId("banner-1");
  expect(bannerComponent).toBeInTheDocument();
  expect(bannerComponent).toHaveStyle(
    "flex-wrap: nowrap",
    "justify-content: flex-start",
    "align-content: center",
    "height: 100px;",
    "background-color: grey",
    "color: white",
    "border-radius: 0px"
  );
});
