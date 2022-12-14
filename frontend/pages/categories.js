import React, { useContext, useState } from 'react';
import {
  Flex,
  Text,
  Modal,
  Button,
  Table,
  AddCategoryForm,
  ViewBookPage
} from '../components';
import colors from '../theme/colors';
import { ViewBookContext } from '../providers';
import CategoriesContext from '../providers/CategoriesContext/CategoriesContext';
import useHelperFunctions from '../hooks/useHelperFunctions';

const CategoriesPage = () => {
  const [showBooksInCategory, setShowBooksInCategory] = useState(false);
  const [targetCategory, setTargetCategory] = useState({});
  const [showAddCategoryModal, setAddCategoryModal] = useState(false); //Determines if AddBook Modal is shown or not

  const { compareText } = useHelperFunctions();

  const { categoriesLoading, categoriesError, categories } =
    useContext(CategoriesContext);
  const [showViewBookModal, setShowViewBookModal, bookId, setBookId] =
    useContext(ViewBookContext);

  const categoryClickHandler = e => {
    e.stopPropagation();
    let targetId = e.target.id?.split('_')[1];

    if (targetId != undefined) {
      setTargetCategory(
        categories.find(cat => cat.id.toString() === targetId.toString())
      );
      setShowBooksInCategory(true);
    }
  };

  //useMemo so that when data is refreshed the table isnt
  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'name',
        sortType: compareText // custom function
      },
      {
        Header: 'Number Of Books',
        accessor: 'books.length'
      }
    ],
    []
  );

  const bookDetailColumns = React.useMemo(
    () => [
      {
        Header: 'Book Title',
        accessor: 'title' // accessor is the "key" in the data
      },
      {
        Header: 'Author',
        accessor: 'author.name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      }
    ],
    []
  );

  const data = React.useMemo(
    () =>
      Object.values(categories).map(cat => {
        return {
          ...cat,
          name: (
            <Text
              clickable={true}
              onClick={categoryClickHandler}
              bgColor={'unset'}
              sort={cat.name}
            >
              <a id={'category_' + cat.id}>{cat.name}</a>
            </Text>
          ),
          books: cat.books
        };
      }),
    [categories, categoriesLoading]
  );

  const targetBookData = () => {
    return targetCategory.books.map(book => {
      return {
        ...book,
        description: (
          <div style={{ height: '220px', overflow: 'auto' }}>
            {book.description}
          </div>
        ),
        author: {
          ...book.author,
          name: book.author.firstName + ' ' + book.author.lastName
        },
        title: (
          <Text
            clickable={true}
            bgColor={'unset'}
            onClick={() => {
              setBookId(book.id);
              setShowViewBookModal(value => !value);
            }}
          >
            {book.title}
          </Text>
        )
      };
    });
  };
  return (
    <>
      {!categoriesLoading ? (
        <>
          {showBooksInCategory && (
            <div
              style={{
                backgroundColor: `${colors.mono[1]}`,
                marginTop: '.5rem'
              }}
            >
              <Text
                clickable={true}
                onClick={() =>
                  setShowBooksInCategory(value => {
                    !value;
                  })
                }
                bgColor={colors.mono[1]}
                margin={'0px 0px 0px 1rem'}
                display={'inline-block'}
                fontSize={'0.75'}
              >
                <span>Categories</span>
              </Text>
              <Text
                display={'inline-block'}
                fontSize={'0.75'}
                bgColor={colors.mono[1]}
              >
                / Books In Category
              </Text>
            </div>
          )}
          <Flex
            justifyContent={'space-between'}
            alignContent={'center'}
            bgColor={colors.mono[1]}
            wrap={'wrap'}
            zIndex={'0'}
            margin={'20px 0px 20px 0px'}
          >
            <div style={{ padding: '2rem 4rem' }}>
              <Text bgColor={colors.mono[1]} fontSize={'2'}>
                {!showBooksInCategory
                  ? 'Categories'
                  : 'Books In Category: ' + targetCategory.name}
              </Text>
            </div>
            <div style={{ padding: '2rem 4rem' }}>
              <Button onClick={() => setAddCategoryModal(value => !value)}>
                + Add Category
              </Button>
            </div>
          </Flex>
          <Flex
            justifyContent={'center'}
            alignContent={'center'}
            bgColor={colors.mono[1]}
            wrap={'wrap'}
            zIndex={'0'}
            height={'100%'}
          >
            <Table
              columns={showBooksInCategory ? bookDetailColumns : columns}
              data={showBooksInCategory ? targetBookData() : data}
            />
          </Flex>
          {showAddCategoryModal && (
            <Modal
              onClick={() => setAddCategoryModal(value => !value)}
              title={'Add New Category'}
            >
              <AddCategoryForm
                onClick={() => setAddCategoryModal(value => !value)}
              />
            </Modal>
          )}
          {showViewBookModal && (
            <Modal
              onClick={() => setShowViewBookModal(value => !value)}
              title={'Book Info'}
            >
              <ViewBookPage
                bookId={bookId}
                returnPath={'Categories / Books In Category '}
                onClick={() => setShowViewBookModal(value => !value)}
              />
            </Modal>
          )}
        </>
      ) : (
        <div>Categories Loading...</div>
      )}
    </>
  );
};

export default CategoriesPage;
