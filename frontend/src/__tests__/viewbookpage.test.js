import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { ViewBookPage } from "../../components";
import { gql } from "@apollo/client";
import { debug } from "jest-preview";
import { useGetBook } from "../../api/books";

afterEach(cleanup);

const getBookMOCK = (id) => [
  {
    request: {
      query: gql`
        query getBook($id: ID!) {
          getBook(id: $id) {
            id
            title
            coverImage
            author {
              id
              firstName
              lastName
            }
            description
          }
        }
      `,
      variables: { id: id },
    },
    result: {
      data: {
        getBook: {
          title: "Harry Potter and the Chamber of Secrets",
          description:
            "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.",
          author: {
            firstName: "J.K.",
            lastName: "Rowling",
          },
        },
      },
    },
  },
];
jest.mock("../../api/books");
const mockUseGetBook = useGetBook;
it("should render a ViewBookPage component", () => {
  mockUseGetBook.mockReturnValue({
    bookLoading: false,
    bookError: false,
    book: {
      title: "Hello",
      author: {
        firstName: "Jim",
        lastName: "Bob",
      },
      description: "Hello Worlds",
    },
  });
  render(<ViewBookPage />);
  const viewBookPage = screen.getByTestId("page-1");
  expect(viewBookPage).toBeInTheDocument();
  debug();
});
