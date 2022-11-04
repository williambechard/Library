import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import section from "../../components/Section";
import { Footer } from "../../components";
import footer from "../../components/Footer";
jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

it("should render a Home component", () => {
  render(<Home />);
  const homeComponent = screen.getByTestId("home-1");
  const headerComponent = screen.getByText("William's Capstone");
  const sectionComponent = screen.getByTestId("section-1");
  const textComponent = screen.getByText("Hello World!");
  const footerComponent = screen.getByText(
    "@ 2022 Omni Federal - All Rights Reserved"
  );

  expect(homeComponent).toBeInTheDocument();

  expect(headerComponent).toBeInTheDocument();
  expect(headerComponent).toHaveStyle("background-color:white");
  expect(headerComponent).toHaveStyle("color:black");

  expect(sectionComponent).toBeInTheDocument();

  expect(textComponent).toBeInTheDocument();
  expect(textComponent).toHaveStyle("background-color:#dfdfdf");

  expect(footerComponent).toBeInTheDocument();
});
