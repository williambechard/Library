import React, { useContext, useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Modal,
  Button,
  Table,
  AddCategoryForm
} from '../components';
import colors from '../theme/colors';
import { BooksContext } from '../providers';
import triggerModal from '../helper/triggerModal';
import CategoriesContext from '../providers/CategoriesContext/CategoriesContext';

const CategoriesPage = () => {
  const [showBooksInCategory, setShowBooksInCategory] = useState(false);
  const [targetCategory, setTargetCategory] = useState({});
  const [showAddCategoryModal, setAddCategoryModal] = useState(false); //Determines if AddBook Modal is shown or not
  const books = useContext(BooksContext);
  const { categoriesLoading, categoriesError, categories } =
    useContext(CategoriesContext);

  const categoryClickHandler = e => {
    e.stopPropagation();
    let targetId = e.target.id?.split('_')[1];
    console.log('targetIde ', targetId);
    if (targetId != undefined) {
      let c = categories.find(
        cat => cat.id.toString() === e.target.id.split('_')[1].toString()
      );
      console.log('c ', c);
      setTargetCategory(c);
      setShowBooksInCategory(true);
    } else console.log('targetId = ', targetId);

    console.log('targetcategory ', targetCategory);
  };

  //useMemo so that when data is refreshed the table isnt, unless the data has actually
  // changed
  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'name' // accessor is the "key" in the data
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
            <a id={'category_' + cat.id} onClick={categoryClickHandler}>
              {cat.name}
            </a>
          ),
          books: cat.books
        };
      }),
    [categories, categoriesLoading]
  );

  //const bookDetailsData = React.useMemo( () => Object.values(targetCategory.books),, [targetCategory]);
  //console.log('data', data);
  return (
    <>
      {!categoriesLoading ? (
        <>
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
                Categories
              </Text>
            </div>
            <div style={{ padding: '2rem 4rem' }}>
              <Button
                onClick={() =>
                  triggerModal(setAddCategoryModal, showAddCategoryModal)
                }
              >
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
            {!showBooksInCategory ? (
              <Table columns={columns} data={data ?? {}} />
            ) : (
              <>
                <Table
                  columns={bookDetailColumns}
                  data={targetCategory.books.map(book => {
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
                      }
                    };
                  })}
                />
              </>
            )}
          </Flex>
          {showAddCategoryModal && (
            <Modal
              onClick={() =>
                triggerModal(setAddCategoryModal, showAddCategoryModal)
              }
              title={'Add New Category'}
            >
              <AddCategoryForm
                onClick={() =>
                  triggerModal(setAddCategoryModal, showAddCategoryModal)
                }
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
