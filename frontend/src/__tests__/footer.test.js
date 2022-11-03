import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer/Footer";
it("should render a Footer component", () => {
  render(<Footer />);
  const footerComponent = screen.getByTestId("footer-1");
  expect(footerComponent).toBeInTheDocument();
  expect(footerComponent).toHaveStyle(
    "display: flex",
    "flex-wrap: nowrap",
    "justify-content: center",
    "align-content: center"
  );
});
