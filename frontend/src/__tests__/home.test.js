import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import Home from "../../pages/index";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import { allBooksQueryBasic } from "../../api/books";

afterEach(cleanup);

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

const simpleGetAllBooksMOCK = [
  {
    request: {
      query: allBooksQueryBasic,
      variables: {},
    },
    result: {
      data: {
        getBooks: [
          {
            id: "1",
            title: "Harry Potter and the Chamber of Secrets",
            author: {
              firstName: "J.K.",
              lastName: "Rowling",
            },
          },
          {
            id: "2",
            title: "Harry Potter and the Prisoner of Azkaban",
            author: {
              firstName: "J.K.",
              lastName: "Rowling",
            },
          },
          {
            id: "3",
            title: "Harry Potter and the Goblet of Fire",
            author: {
              firstName: "J.K.",
              lastName: "Rowling",
            },
          },
          {
            id: "4",
            title: "C All in One Desk Reference For Dummies",
            author: {
              firstName: "Dan",
              lastName: "Gookin",
            },
          },
        ],
      },
    },
  },
];

it("should render books", async () => {
  render(
    <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
      <Home />
    </MockedProvider>
  );
  const homeComponent = screen.getByTestId("page-1");
  expect(homeComponent).toBeInTheDocument();

  const foundBook = await screen.findByText(
    "Harry Potter and the Chamber of Secrets"
  );

  expect(foundBook).toBeInTheDocument();
});

it("should render a Home component", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  );
  const homeComponent = screen.getByTestId("home-1");
  // const headerComponent = screen.getByText("William's Capstone");
  // const sectionComponent = screen.getByTestId("section-1");
  // const textComponent = screen.getByText("Hello World!");
  // const footerComponent = screen.getByText(
  //   "@ 2022 Omni Federal - All Rights Reserved"
  // );
  expect(homeComponent).toBeInTheDocument();
  /*
  expect(headerComponent).toBeInTheDocument();
  expect(headerComponent).toHaveStyle("background-color:white");
  expect(headerComponent).toHaveStyle("color:black");

  expect(sectionComponent).toBeInTheDocument();

  expect(textComponent).toBeInTheDocument();
  expect(textComponent).toHaveStyle("background-color:#dfdfdf");

  expect(footerComponent).toBeInTheDocument();*/
});
