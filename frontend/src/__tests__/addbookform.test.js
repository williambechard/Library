import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddBookForm from "../../components/AddBookForm";
import { debug } from "jest-preview";
import { useAddBook, useGetBook } from "../../api/books";
import { useAddAuthor, useGetAuthors } from "../../api/authors";
import userEvent, { user } from "@testing-library/user-event";

//describe add book form
// then ifs with different states
// look into aftereach nesting?

jest.mock("../../api/books");
jest.mock("../../api/authors");

describe("AddBookForm Component Tests", () => {
  it("should display the default AddBookForm", async () => {
    useAddBook.mockReturnValue({
      addBook: jest.fn(),
    });
    useAddAuthor.mockReturnValue({
      addAuthor: jest.fn(),
    });
    useGetAuthors.mockReturnValue({
      authors: jest.fn(),
    });
    render(<AddBookForm />);

    const addBookFormComponent = screen.getByTestId("form-1");
    expect(addBookFormComponent).toBeInTheDocument();
    debug();
  });
  it("should call the onClick function when Cancel Button is pressed", async () => {
    const mockCallBack = jest.fn();
    useAddBook.mockReturnValue({
      addBook: jest.fn(),
    });
    useAddAuthor.mockReturnValue({
      addAuthor: jest.fn(),
    });
    useGetAuthors.mockReturnValue({
      authors: jest.fn(),
    });
    render(<AddBookForm onClick={mockCallBack} />);

    const cancelButton = screen.getByLabelText("Cancel");
    await userEvent.click(cancelButton);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  it("should not submit with invalid input", async () => {
    useAddBook.mockReturnValue({
      addBook: jest.fn(),
    });
    useAddAuthor.mockReturnValue({
      addAuthor: {
        id: "2",
        "First Name": "Jim",
        "Last Name": "Bob",
      },
    });
    useGetAuthors.mockReturnValue({
      authors: [{ id: "1", "First Name": "Will", "Last Name": "Smith" }],
    });
    render(<AddBookForm />);

    const submitButton = screen.getByLabelText("Add Book");
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    debug();
  });
  it("should add the author if the author doesnt already exist", async () => {
    const mockOnSubmit = jest.fn();
    jest.mock("react-hook-form", () => ({
      ...jest.requireActual("react-hook-form"),
      useFormContext: () => ({
        getValues: () => {
          return [
            {
              Title: "Book 2",
              Description: "Test Description",
              "First Name": "Will",
              "Last Name": "Smith",
            },
          ];
        },
      }),
    }));

    const mockCallBack = jest.fn();
    //const eventAddBook = mockAddBook.mockReturnValue(() => {
    //  return jest.fn(() => promise.error({ data: { title: "Book 2" } }));
    //});
    /*
    const eventAddAuthor = mockAddAuthor.mockReturnValue(() => {
      return {
        data: {
          addAuthor: {
            "First Name": "Will",
            "Last Name": "Smith",
            id: "2",
          },
        },
      };
    });
    const eventGetAuthors = mockAuthors.mockReturnValue(() => {
      return ({ authors } = [
        {
          "First Name": "John",
          "Last Name": "Johnson",
          id: "1",
        },
      ]);
    });
*/
    render(<AddBookForm onClick={mockCallBack} onSubmit={mockOnSubmit} />);

    const addBookFormComponent = screen.getByTestId("form-1");
    expect(addBookFormComponent).toBeInTheDocument();

    const submitButton = screen.getByLabelText("Add Book");
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    //expect(eventGetAuthors).toHaveBeenCalledTimes(1);
    //expect(eventAddAuthor).toHaveBeenCalledTimes(1);
    //expect(eventAddBook).toHaveBeenCalledTimes(1);

    debug();
  });
  it("should use the found author's id if author already exists when adding a new book", async () => {
    const user = userEvent.setup();
    /*jest.mock("react-hook-form", () => ({
      ...jest.requireActual("react-hook-form"),
      useFormContext: () => ({
        handleSubmit: () => jest.fn(),
        getValues: () => {
          return [
            {
              Title: "Book 2",
              Description: "Test Description",
              "First Name": "Will",
              "Last Name": "Smith",
            },
          ];
        },
      }),
    }));*/

    const mockCallBack = jest.fn();
    const eventAddBook = mockAddBook.mockReturnValue(() => {
      return true;
    });
    const eventAddAuthor = mockAddAuthor.mockReturnValue(() => {
      return true;
    });
    const eventGetAuthors = mockAuthors.mockReturnValue(() => {
      return ({ authors } = [
        {
          "First Name": "Will",
          "Last Name": "Smith",
          id: "1",
        },
      ]);
    });

    render(<AddBookForm onClick={mockCallBack} />);

    const addBookFormComponent = screen.getByTestId("form-1");
    expect(addBookFormComponent).toBeInTheDocument();

    const title = screen.getByRole("textbox", {
      name: /title/i,
    });
    expect(title).toBeInTheDocument();
    user.type(title, "Book 2");

    debug();
    const submitButton = screen.getByLabelText("Add Book");
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    expect(eventGetAuthors).toHaveBeenCalledTimes(1);
    expect(eventAddBook).toHaveBeenCalledTimes(1);
  });
});
