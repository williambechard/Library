import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Section from "../../components/Section/Section";

it("should render a Section component", () => {
  render(<Section />);
  const sectionComponent = screen.getByTestId("section-1");
  expect(sectionComponent).toBeInTheDocument();
  expect(sectionComponent).toHaveStyle(
    "display: flex",
    "flex-direction: column",
    "align-items: flex-start",
    "flex: 1",
    "padding: 3rem 1rem",
    "background: #dfdfdf",
    "margin: 0"
  );
});
