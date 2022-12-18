import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../../pages';
import { useGetBooks } from '../../../api/books';
import userEvent from '@testing-library/user-event';
jest.mock('../../../api/books');
jest.mock('../../../api/authors');
jest.mock(
  'next/image',
  () =>
    function Image({ src, alt, width, height }) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        // eslint-disable-next-line
        <img src={src} alt={alt} style={{ width: width, height: height }} />
      );
    }
);

jest.mock('../../../components/Modal/Modal', () => ({ children }) => {
  return (
    <>
      <div>MODAL</div>
      {children}
    </>
  );
});
jest.mock('../../../components/AddBookForm/AddBookForm', () => () => {
  return <div>Add Book Form</div>;
});
jest.mock('../../../components/ViewBookPAge/ViewBookPage', () => () => {
  return <div>View Book Page</div>;
});

describe('test of the main index home page', () => {
  it('should display the default page', () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: []
    });
    render(<Home />);

    expect(screen.getByText("William's Capstone")).toBeInTheDocument();
    expect(screen.getAllByTestId('section-1')[0]).toHaveStyle(
      'background-color:#DFDFDF'
    );
    expect(screen.getByText('My Library')).toHaveStyle('color:black');
    expect(
      screen.getByText('@ 2022 Omni Federal - All Rights Reserved')
    ).toBeInTheDocument();
  });
  it('should show no book Cards if no books loaded', () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: []
    });
    render(<Home />);
    expect(screen.getByText('No Books Found...')).toBeInTheDocument();
  });
  it('should show book a book Card for each book loaded (1x)', () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: [
        {
          id: '1',
          title: 'Hello',
          author: {
            firstName: 'Jim',
            lastName: 'Bob'
          },
          description: 'Hello World'
        }
      ]
    });
    render(<Home />);
    expect(screen.queryByText('No Books Found...')).not.toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  it('should open Add Book Form when + book button clicked', async () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: []
    });

    render(<Home />);

    const addBookButton = screen.getByRole('button', {
      label: '+ Add Book'
    });
    expect(addBookButton).toBeInTheDocument();
    await userEvent.click(addBookButton);
    expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Book Form/i)).toBeInTheDocument();
  });
  it('should open View Book Form when a book card is clicked', async () => {
    const mockUseGetBooks = useGetBooks;
    mockUseGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: [
        {
          id: '1',
          title: 'Hello',
          author: {
            firstName: 'Jim',
            lastName: 'Bob'
          },
          description: 'Hello World'
        }
      ]
    });

    render(<Home />);

    const bookCard = screen.getByText('Hello');
    expect(bookCard).toBeInTheDocument();
    await userEvent.click(bookCard);
    expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
    expect(screen.getByText(/View Book Page/i)).toBeInTheDocument();
  });
});
