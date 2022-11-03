import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);
it("should render a Section component", () => {
  render(<Home />);
  const homeComponent = screen.getByTestId("home-1");
  expect(homeComponent).toBeInTheDocument();
});
