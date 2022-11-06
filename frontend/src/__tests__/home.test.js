import "@testing-library/jest-dom";
import { render, screen, cleanup, findByText } from "@testing-library/react";
import Home from "../../pages/index";
import AutoMockedProvider from "../../utils/AutoMockedProvider";
import { act } from "react-dom/test-utils";
import preview from "jest-preview";

afterEach(cleanup);

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt, width, height }) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img src={src} alt={alt} style={{ width: width, height: height }} />
      );
    }
);

it("should render books", async () => {
  await act(() => {
    render(
      <AutoMockedProvider>
        <Home />
      </AutoMockedProvider>
    );
  });

  const homeComponent = screen.getByTestId("page-1");
  const headerComponent = screen.getByText("William's Capstone");
  const sectionComponent = screen.getByTestId("section-1");
  const textComponent = screen.getByText("My Library");
  const footerComponent = screen.getByText(
    "@ 2022 Omni Federal - All Rights Reserved"
  );
  const image = screen.getByAltText("DULogo");

  expect(image).toBeInTheDocument();

  expect(homeComponent).toBeInTheDocument();
  expect(homeComponent).toBeInTheDocument();
  expect(headerComponent).toBeInTheDocument();
  expect(headerComponent).toHaveStyle("background-color:white");
  expect(headerComponent).toHaveStyle("color:black");

  expect(sectionComponent).toBeInTheDocument();

  expect(textComponent).toBeInTheDocument();
  expect(textComponent).toHaveStyle("background-color:#dfdfdf");
  expect(footerComponent).toBeInTheDocument();
  //const book = await screen.findByText("Book 1");
  //expect(book).toBeInTheDocument();
  preview.debug();
});
