import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../components/Page/Page";
it("should render a Page component", () => {
  render(<Page />);
  const flexComponent = screen.getByTestId("page-1");
  expect(flexComponent).toBeInTheDocument();
  expect(flexComponent).toHaveStyle(
    "display: grid",
    "grid-template-rows:auto 1fr auto",
    "height: 100vh",
    "border-radius: 0",
    "background-color:white"
  );
});
