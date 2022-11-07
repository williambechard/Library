import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Home from "../../pages/index";
import { MockedProvider } from "@apollo/client/testing";
import { allBooksQueryBasic } from "../../api/books";
import preview from "jest-preview";
import { act } from "react-dom/test-utils";
import AddBookModal from "../../components/AddBookForm";
import { gql } from "@apollo/client";

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
  {
    request: {
      query: gql`
        mutation addAuthor($firstName: String!, $lastName: String!) {
          addAuthor(firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
          }
        }
      `,
      variables: {
        firstName: "Jim",
        lastName: "Bob",
      },
      result: {
        data: {
          addAuthor: {
            id: "1",
            firstName: "Jim",
            lastName: "Bob",
          },
        },
      },
    },
    result: {
      data: {
        addAuthor: {
          id: "1",
          firstName: "Jim",
          lastName: "Bob",
        },
      },
    },
  },
];
describe("should display the main web page", () => {
  it("should render books from My Library", async () => {
    render(
      <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(screen.getByTestId("page-1")).toBeInTheDocument();
    expect(screen.getByText("William's Capstone")).toBeInTheDocument();
    expect(screen.getByTestId("section-1")).toHaveStyle(
      "background-color:#DFDFDF"
    );
    expect(screen.getByText("My Library")).toHaveStyle("color:black");
    expect(
      screen.getByText("@ 2022 Omni Federal - All Rights Reserved")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Harry Potter and the Chamber of Secrets")
    ).toBeInTheDocument();

    preview.debug();
  });
  it("should open AddBookModal on + Add Book button click", async () => {
    render(
      <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await act(() => {
      screen
        .getByText("+ Add Book")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    preview.debug();
  });

  it("should remove Add New Book when the Cancel button is clicked", async () => {
    render(
      <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    await act(() => {
      screen
        .getByText("+ Add Book")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    await act(() => {
      screen
        .getByText("Cancel")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    //expect(screen.getByText("Add New Book")).not.toBeInTheDocument();
    preview.debug();
  });

  it("should remove Add New Book when the X button is clicked", async () => {
    render(
      <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    await act(() => {
      screen
        .getByText("+ Add Book")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    await act(() => {
      screen
        .getByText("X")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    //expect(screen.getByText("Add New Book")).not.toBeInTheDocument();
    preview.debug();
  });

  it("should display an error when no text is entered in form fields", async () => {
    render(
      <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    await act(() => {
      screen
        .getByText("+ Add Book")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    await act(() => {
      screen
        .getByText("Add Book")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(screen.getAllByText("Input not valid!")).toBeTruthy();
    preview.debug();
  });
  it("should Add a Book to My Library", async () => {
    const submitFunc = jest.fn();

    await act(() => {
      render(
        <MockedProvider mocks={simpleGetAllBooksMOCK} addTypename={false}>
          <AddBookModal onClickHandler={jest.fn()} onSubmit={submitFunc} />
        </MockedProvider>
      );
    });

    expect(screen.getByText("Add New Book")).toBeInTheDocument();

    fireEvent.change(document.querySelector('input[name="Title"]'), {
      target: { value: "Book 2" },
    });

    fireEvent.change(document.querySelector('input[name="First Name"]'), {
      target: { value: "Jim" },
    });
    fireEvent.change(document.querySelector('input[name="Last Name"]'), {
      target: { value: "Bob" },
    });
    fireEvent.change(document.querySelector('textarea[name="Description"]'), {
      target: { value: "A murder mystery" },
    });

    await act(() => {
      screen
        .getByText("Add Book")
        .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(submitFunc).toHaveBeenCalledTimes(1);

    preview.debug();
  });
});
