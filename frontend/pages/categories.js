import React, { useContext, useState } from 'react';
import {
  Section,
  Flex,
  Card,
  Text,
  ViewBookPage,
  Modal,
  Button,
  Table,
  AddCategoryForm
} from '../components';
import colors from '../theme/colors';
import { BooksContext, ViewBookContext } from '../providers';
import triggerModal from '../helper/triggerModal';
import { useGetCategories } from '../api/categories';

const CategoriesPage = () => {
  const [showAddCategoryModal, setAddCategoryModal] = useState(false); //Determines if AddBook Modal is shown or not
  const { categoriesLoading, categoriesError, categories } = useGetCategories();

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

  const data = React.useMemo(() => Object.values(categories), [categories]);

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
            transform={'translateY(125px)'}
          >
            <div style={{ padding: '0rem 4rem' }}>
              <Text bgColor={colors.mono[1]} fontSize={'2'}>
                Categories
              </Text>
            </div>
            <div style={{ padding: '0rem 4rem' }}>
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
            transform={'translateY(125px)'}
            height={'100%'}
          >
            <Table columns={columns} data={data} />
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
