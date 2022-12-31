import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ViewBookPage } from '../../../components';
import { useGetBook } from '../../../api/books';
import userEvent from '@testing-library/user-event';
import triggerModal from '../../../helper/triggerModal';

const triggerMock = jest.mock('../../../helper/triggerModal');
jest.mock('../../../api/books');
const mockUseGetBook = useGetBook;

jest.mock('../../../components/AddBookForm/AddBookForm', () => () => {
  return <div>Edit Book</div>;
});
jest.mock('../../../components/Modal/Modal', () => ({ children }) => {
  return (
    <>
      <div>MODAL</div>
      {children}
    </>
  );
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Book Info Page Component Tests', () => {
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=true and bookError=false', () => {
    mockUseGetBook.mockReturnValue({
      bookLoading: true,
      bookError: false
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=false and bookError=true', () => {
    mockUseGetBook.mockReturnValue({
      bookLoading: false,
      bookError: true
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=true and bookError=true', () => {
    mockUseGetBook.mockReturnValue({
      bookLoading: true,
      bookError: true
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a ViewBookPage component and respond to a click on the My Library breadcrumb', async () => {
    mockUseGetBook.mockReturnValue({
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
    mockUseGetBook.mockReturnValue({
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

    expect(screen.getByText(/Edit Book/i)).toBeInTheDocument();
  });
});
