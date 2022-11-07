import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import AddBookModal from "../../components/AddBookForm";
import { MockedProvider } from "@apollo/client/testing";
import { allBooksQueryBasic } from "../../api/books";
import preview from "jest-preview";

afterEach(cleanup);

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
describe("should display the AddBookModal", () => {
  it("AddBookModal should be visible", async () => {
    render(
      <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
        <AddBookModal />
      </MockedProvider>
    );

    expect(await screen.findByText("Add New Book")).toBeInTheDocument();

    preview.debug();
  });
});
