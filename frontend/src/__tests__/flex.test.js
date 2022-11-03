import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Flex from "../../components/Flex/Flex";
it("should render a Flex component", () => {
  render(<Flex />);
  const flexComponent = screen.getByTestId("flex-1");
  expect(flexComponent).toBeInTheDocument();
  expect(flexComponent).toHaveStyle(
    "width:100%",
    "display: flex",
    "width: 100%"
  );
});
