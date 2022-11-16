import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddBookForm from "../../components/AddBookForm";
import { debug } from "jest-preview";
import { useAddBook, useGetBook } from "../../api/books";
import { useAddAuthor, useGetAuthors } from "../../api/authors";
import userEvent, { user } from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";

//describe add book form
// then ifs with different states
// look into aftereach nesting?

jest.mock("../../api/books");
jest.mock("../../api/authors");
afterEach(() => {
  jest.clearAllMocks();
});
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
    expect(addBookFormComponent).toHaveStyle("width: 100%", "height: 100%");
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
  it("should not submit with invalid (blank) input", async () => {
    const mockCallBack = jest.fn();
    const addBookCallBack = useAddBook.mockReturnValue({
      addBook: () => Promise.resolve({ data: true }),
    });

    useAddAuthor.mockReturnValue({
      addAuthor: (fName, lName) =>
        Promise.resolve({
          data: {
            addAuthor: {
              id: "2",
              firstName: fName,
              lastName: lName,
            },
          },
        }),
    });
    useGetAuthors.mockReturnValue({
      authors: [{ id: "1", "First Name": "Will", "Last Name": "Smith" }],
    });

    render(<AddBookForm onSubmit={mockCallBack} />);

    const submitButton = screen.getByLabelText("Add Book");

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(mockCallBack).not.toHaveBeenCalled();
    debug();
  });

  it("should add the author if the author doesnt already exist", async () => {
    const addBookCallBack = useAddBook.mockReturnValue({
      addBook: () => Promise.resolve({ data: true }),
    });

    const addAuthCallBack = useAddAuthor.mockReturnValue({
      addAuthor: (fName, lName) =>
        Promise.resolve({
          data: {
            addAuthor: {
              id: "2",
              firstName: fName,
              lastName: lName,
            },
          },
        }),
    });

    useGetAuthors.mockReturnValue({
      authors: [{ id: "1", firstName: "Will", lastName: "Smith" }],
    });

    render(<AddBookForm />);

    const Title = screen.getByRole("textbox", { name: /title/i });
    expect(Title).toBeInTheDocument();
    fireEvent.change(Title, { target: { value: "hello" } });
    await waitFor(() => {
      expect(Title).toHaveValue("hello");
    });

    const FirstName = screen.getByRole("textbox", { name: /first name/i });
    fireEvent.change(FirstName, { target: { value: "Will" } });
    await waitFor(() => {
      expect(FirstName).toHaveValue("Will");
    });

    const LastName = screen.getByRole("textbox", { name: /last name/i });
    fireEvent.change(LastName, { target: { value: "Smith" } });
    await waitFor(() => {
      expect(LastName).toHaveValue("Smith");
    });

    const Description = screen.getByRole("textbox", { name: /description/i });
    fireEvent.change(Description, { target: { value: "Hello World" } });
    await waitFor(() => {
      expect(Description).toHaveValue("Hello World");
    });
    const submitButton = screen.getByLabelText("Add Book");

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);

    debug();
  });
});
