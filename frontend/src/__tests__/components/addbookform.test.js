import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddBookForm from '../../../components/AddBookForm';
import { useAddBook, useGetBooks, useUpdateBook } from '../../../api/books';
import { useAddAuthor, useGetAuthors } from '../../../api/authors';
import { useGetCategories, useUpdateCategory } from '../../../api/categories';
import userEvent from '@testing-library/user-event';
import { BooksProvider, CategoriesProvider } from '../../../providers';

jest.mock('../../../api/books');
jest.mock('../../../api/authors');
jest.mock('../../../api/categories');

beforeEach(() => {
  jest.resetAllMocks();
  useGetBooks.mockReturnValue({
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

  useGetCategories.mockReturnValue({
    categoriesLoading: false,
    categoriesError: false,
    categories: [
      {
        id: '1',
        name: 'Fantasy',
        books: ['1']
      }
    ]
  });

  useUpdateCategory.mockReturnValue({
    updateCategoryLoading: false,
    updateCategoryError: false,
    updateCategory: (oldId, id, name, bookId) => jest.fn()
  });

  useUpdateBook.mockReturnValue({
    updateBook: (id, title, authorId, categoryId, description) => jest.fn(),
    updateBookLoading: false,
    updateBookError: false
  });

  useAddBook.mockReturnValue({
    addBook: jest.fn()
  });
});

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

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm />
        </CategoriesProvider>
      </BooksProvider>
    );

    const addBookFormComponent = screen.getByRole('form');
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

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm onClick={mockCallBack} />
        </CategoriesProvider>
      </BooksProvider>
    );

    const cancelButton = screen.getByLabelText('closeAddBookForm');
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

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm />
        </CategoriesProvider>
      </BooksProvider>
    );

    const submitButton = screen.getByLabelText('submitAddBookForm');

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
  it('should call addBook when form is submitted', async () => {
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

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm />
        </CategoriesProvider>
      </BooksProvider>
    );

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'hello');
    expect(title).toHaveValue('hello');

    const firstName = screen.getByRole('textbox', { name: /first name/i });
    await userEvent.type(firstName, 'Will');
    expect(firstName).toHaveValue('Will');

    const lastName = screen.getByRole('textbox', { name: /last name/i });
    await userEvent.type(lastName, 'Smith');
    expect(lastName).toHaveValue('Smith');

    const description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(description, 'Hello World');
    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitAddBookForm');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
  it('should update a book', async () => {
    const updateBookCallBack = useUpdateBook.mockReturnValue({
      updateBook: () => Promise.resolve({ data: true })
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

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm bookId={'1'} />
        </CategoriesProvider>
      </BooksProvider>
    );

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveValue('Hello');

    const firstName = screen.getByRole('textbox', { name: /first name/i });
    expect(firstName).toHaveValue('Jim');

    const lastName = screen.getByRole('textbox', { name: /last name/i });
    expect(lastName).toHaveValue('Bob');

    const description = screen.getByRole('textbox', { name: /description/i });
    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitUpdateBookForm');
    await userEvent.click(submitButton);

    expect(updateBookCallBack).toHaveBeenCalledTimes(1);
  });
  it('should create an author if no previous author is found when new book is sumitted', async () => {
    const addBookCallBack = useAddBook.mockReturnValue({
      addBook: () => Promise.resolve({ data: true })
    });

    useAddAuthor.mockReturnValue({
      addAuthor: (fName, lName) => ({
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
      authors: [{ id: '2', firstName: 'Will', lastName: 'Smithers' }]
    });

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm />
        </CategoriesProvider>
      </BooksProvider>
    );

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'hello');
    expect(title).toHaveValue('hello');

    const firstName = screen.getByRole('textbox', { name: /first name/i });
    await userEvent.type(firstName, 'Will');
    expect(firstName).toHaveValue('Will');

    const lastName = screen.getByRole('textbox', { name: /last name/i });
    await userEvent.type(lastName, 'Smith');
    expect(lastName).toHaveValue('Smith');

    const description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(description, 'Hello World');
    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitAddBookForm');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
  it('should find an author that already exists when new book is submitted', async () => {
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

    render(
      <BooksProvider>
        <CategoriesProvider>
          <AddBookForm />
        </CategoriesProvider>
      </BooksProvider>
    );

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'hello');

    expect(title).toHaveValue('hello');

    const firstName = screen.getByRole('textbox', { name: /first name/i });
    await userEvent.type(firstName, 'Will');

    expect(firstName).toHaveValue('Will');

    const lastName = screen.getByRole('textbox', { name: /last name/i });
    await userEvent.type(lastName, 'Smith');

    expect(lastName).toHaveValue('Smith');

    const description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(description, 'Hello World');

    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitAddBookForm');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
});
