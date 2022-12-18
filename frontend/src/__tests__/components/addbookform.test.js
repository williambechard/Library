import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import AddBookForm from '../../../components/AddBookForm';
import { useAddBook } from '../../../api/books';
import { useAddAuthor, useGetAuthors } from '../../../api/authors';
import userEvent from '@testing-library/user-event';

jest.mock('../../../api/books');
jest.mock('../../../api/authors');

describe('AddBookForm Component Tests', () => {
  it('should display the default AddBookForm', () => {
    useAddBook.mockReturnValue({
      addBook: jest.fn()
    });
    useAddAuthor.mockReturnValue({
      addAuthor: jest.fn()
    });
    useGetAuthors.mockReturnValue({
      authors: jest.fn()
    });

    render(<AddBookForm />);

    const addBookFormComponent = screen.getByTestId('form-1');
    expect(addBookFormComponent).toBeInTheDocument();
    expect(addBookFormComponent).toHaveStyle('width: 100%', 'height: 100%');
  });
  it('should call the onClick function when Cancel Button is pressed', async () => {
    const mockCallBack = jest.fn();
    useAddBook.mockReturnValue({
      addBook: jest.fn()
    });
    useAddAuthor.mockReturnValue({
      addAuthor: jest.fn()
    });
    useGetAuthors.mockReturnValue({
      authors: jest.fn()
    });

    render(<AddBookForm onClick={mockCallBack} />);

    const cancelButton = screen.getByLabelText('Cancel');
    await userEvent.click(cancelButton);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
  it('alerts should display if non valid (blank) input', async () => {
    useAddBook.mockReturnValue({
      addBook: () => Promise.resolve({ data: true })
    });
    useAddAuthor.mockReturnValue({
      addAuthor: (fName, lName) =>
        Promise.resolve({
          data: {
            addAuthor: {
              id: '2',
              firstName: fName,
              lastName: lName
            }
          }
        })
    });
    useGetAuthors.mockReturnValue({
      authors: [{ id: '1', 'First Name': 'Will', 'Last Name': 'Smith' }]
    });

    render(<AddBookForm />);

    const submitButton = screen.getByLabelText('Add Book');

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
  it('should call addBook when form is submitted', async () => {
    jest.clearAllMocks();

    const addBookCallBack = useAddBook.mockReturnValue({
      addBook: () => Promise.resolve({ data: true })
    });

    useAddAuthor.mockReturnValue({
      addAuthor: (fName, lName) =>
        Promise.resolve({
          data: {
            addAuthor: {
              id: '2',
              firstName: fName,
              lastName: lName
            }
          }
        })
    });

    useGetAuthors.mockReturnValue({
      authors: [{ id: '1', firstName: 'Will', lastName: 'Smith' }]
    });

    render(<AddBookForm />);

    const Title = screen.getByRole('textbox', { name: /title/i });
    expect(Title).toBeInTheDocument();
    await userEvent.type(Title, 'hello');

    expect(Title).toHaveValue('hello');

    const FirstName = screen.getByRole('textbox', { name: /first name/i });
    await userEvent.type(FirstName, 'Will');

    expect(FirstName).toHaveValue('Will');

    const LastName = screen.getByRole('textbox', { name: /last name/i });
    await userEvent.type(LastName, 'Smith');

    expect(LastName).toHaveValue('Smith');

    const Description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(Description, 'Hello World');

    expect(Description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('Add Book');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
  it('should create an author if no previous author is found', async () => {
    jest.clearAllMocks();

    const addBookCallBack = useAddBook.mockReturnValue({
      addBook: () => Promise.resolve({ data: true })
    });

    useAddAuthor.mockReturnValue({
      addAuthor: (fName, lName) =>
        Promise.resolve({
          data: {
            addAuthor: {
              id: '2',
              firstName: fName,
              lastName: lName
            }
          }
        })
    });
    useGetAuthors.mockReturnValue({
      authors: [{ id: '1', firstName: 'Will', lastName: 'Smith' }]
    });

    render(<AddBookForm />);

    const Title = screen.getByRole('textbox', { name: /title/i });
    expect(Title).toBeInTheDocument();
    await userEvent.type(Title, 'hello');

    expect(Title).toHaveValue('hello');

    const FirstName = screen.getByRole('textbox', { name: /first name/i });
    await userEvent.type(FirstName, 'Will');

    expect(FirstName).toHaveValue('Will');

    const LastName = screen.getByRole('textbox', { name: /last name/i });
    await userEvent.type(LastName, 'Smith');

    expect(LastName).toHaveValue('Smith');

    const Description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(Description, 'Hello World');

    expect(Description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('Add Book');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
});
