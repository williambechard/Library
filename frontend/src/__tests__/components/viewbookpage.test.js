import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ViewBookPage } from '../../../components';
import { useGetBook } from '../../../api/books';
import userEvent from '@testing-library/user-event';

jest.mock('../../../api/books');

jest.mock('../../../components/AddBookForm/AddBookForm', () => () => {
  return <div>Edit Book</div>;
});
jest.mock(
  '../../../components/Modal/Modal',
  () =>
    ({ children, title, onClick }) => {
      return (
        <div>
          <button onClick={() => onClick}>X</button>
          <div>MODAL {title}</div>
          {children}
        </div>
      );
    }
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Book Info Page Component Tests', () => {
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=true and bookError=false', () => {
    useGetBook.mockReturnValue({
      bookLoading: true,
      bookError: false
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=false and bookError=true', () => {
    useGetBook.mockReturnValue({
      bookLoading: false,
      bookError: true
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=true and bookError=true', () => {
    useGetBook.mockReturnValue({
      bookLoading: true,
      bookError: true
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a ViewBookPage component and respond to a click on the My Library breadcrumb', async () => {
    useGetBook.mockReturnValue({
      bookLoading: false,
      bookError: false,
      book: {
        title: 'Hello',
        author: {
          firstName: 'Jim',
          lastName: 'Bob'
        },
        description: 'Hello Worlds'
      }
    });
    const mockCallBack = jest.fn();
    render(<ViewBookPage returnPath={'My Library'} onClick={mockCallBack()} />);

    const bookLink = screen.getByText('My Library');
    expect(bookLink).toBeInTheDocument();

    await userEvent.click(bookLink);
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
  it('should respond to edit button click', async () => {
    useGetBook.mockReturnValue({
      bookLoading: false,
      bookError: false,
      book: {
        title: 'Hello',
        author: {
          firstName: 'Jim',
          lastName: 'Bob'
        },
        description: 'Hello Worlds'
      }
    });

    render(<ViewBookPage />);

    const editButton = screen.getByText(/Edit/i);
    expect(editButton).toBeInTheDocument();

    await userEvent.click(editButton);

    expect(screen.getByText(/MODAL Edit Book/i)).toBeInTheDocument();

    const xButton = screen.getByRole('button', { name: 'X' });
    expect(xButton).toBeInTheDocument();

    await userEvent.click(xButton);

    waitFor(() =>
      expect(screen.getByText(/MODAL Edit Book/i)).not.toBeInTheDocument()
    );
  });
});
