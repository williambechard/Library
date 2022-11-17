import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

import { useGetBooks } from "../../api/books";

jest.mock("../../api/books");
jest.mock("../../api/authors");
jest.mock(
  "next/image",
  () =>
    function Image({ src, alt, width, height }) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        // eslint-disable-next-line
        <img src={src} alt={alt} style={{ width: width, height: height }} />
      );
    }
);

describe("should display the main web page", () => {
  it("should render books from My Library", async () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: [
        {
          id: "1",
          title: "Hello",
          author: {
            firstName: "Jim",
            lastName: "Bob",
          },
          description: "Hello World",
        },
      ],
    });
    render(<Home />);

    expect(screen.getByText("William's Capstone")).toBeInTheDocument();
    expect(screen.getAllByTestId("section-1")[0]).toHaveStyle(
      "background-color:#DFDFDF"
    );
    expect(screen.getByText("My Library")).toHaveStyle("color:black");
    expect(
      screen.getByText("@ 2022 Omni Federal - All Rights Reserved")
    ).toBeInTheDocument();
  });
  it("should show no book Cards if no books loaded", () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: [],
    });
    render(<Home />);
    expect(screen.queryByTestId(/card-1/i)).toBeNull();
  });
  it("should show book a book Card for each book loaded (1x)", () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: [
        {
          id: "1",
          title: "Hello",
          author: {
            firstName: "Jim",
            lastName: "Bob",
          },
          description: "Hello World",
        },
      ],
    });
    render(<Home />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
