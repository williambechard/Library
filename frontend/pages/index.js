import React, { useState, useContext } from 'react';
import {
  AddBookForm,
  Button,
  Card,
  Flex,
  Modal,
  Section,
  ViewBookPage
} from '../components';
import Link from 'next/link';
import Text from '../components/Text/Text';
import colors from '../theme/colors';
import { useGetBooks } from '../api/books';
import { BooksContext } from '../providers';
import triggerModal from '../helper/triggerModal';
import ViewBookContext from '../providers/ViewBookContext';
/**
 * Main landing page of the application
 */
const Home = () => {
  /**
   * States
   */
  const [showAddBookModal, setAddBookModal] = useState(false); //Determines if AddBook Modal is shown or not
  const [showViewBookModal, setShowViewBookModal, bookId, setBookId] =
    useContext(ViewBookContext);

  const books = useContext(BooksContext);
  //const viewBook = useContext(ViewBookContext);

  //console.log('viewBook ', viewBook);
  /**
   * Function which coverts loaded books data to JSX (Card Components)
   */
  const displayBooks = () => {
    return books.map(book => {
      //loop through all books
      return (
        //for each book return JSX of a Card Component
        <Card
          key={book.id}
          label={book.title}
          onClick={() => {
            setBookId(book.id);
            triggerModal(setShowViewBookModal, showViewBookModal);
          }}
        >
          <Text
            bgColor={colors.mono[2]}
            fontSize={'1'}
            fontWeight={'900'}
            display={'block'}
          >
            <span>{book.title}</span>
          </Text>
          <Text
            bgColor={colors.mono[2]}
            fColor={colors.mono[colors.mono.length - 2]}
            fontSize={1}
            margin={'20px 0px'}
            display={'block'}
          >
            <span>{book.author.firstName + ' ' + book.author.lastName}</span>
          </Text>
        </Card>
      );
    });
  };

  /**
   * returns JSX
   */
  return (
    <Flex
      bgColor={colors.mono[1]}
      justifyContent={'space-between'}
      zIndex={'2'}
      transform={'translateY(80px)'}
    >
      <Flex
        bgColor={colors.mono[1]}
        justifyContent={'space-between'}
        zIndex={'2'}
      >
        <Text bgColor={colors.mono[1]} fontSize={1.5} margin={'auto 20px'}>
          My Library
        </Text>
        <Button
          label={'addBook'}
          onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
          margin={'auto 10px'}
        >
          + Add Book
        </Button>
      </Flex>
      {books.length > 0 ? (
        <Flex
          justifyContent={'flex-start'}
          alignContent={'center'}
          bgColor={colors.mono[1]}
          wrap={'wrap'}
          zIndex={'0'}
          gap={'10px'}
          margin={'0px 0px 100px 0px'}
        >
          {displayBooks()}
        </Flex>
      ) : (
        <Text>No Books Found...</Text>
      )}
      {showAddBookModal && (
        <Modal
          onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
          title={'Add New Book'}
        >
          <AddBookForm
            onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
          />
        </Modal>
      )}
      {showViewBookModal && (
        <Modal
          onClick={() => triggerModal(setShowViewBookModal, showViewBookModal)}
          title={'Book Info'}
        >
          <ViewBookPage
            bookId={bookId}
            returnPath={'My Library'}
            onClick={() =>
              triggerModal(setShowViewBookModal, showViewBookModal)
            }
          />
        </Modal>
      )}
    </Flex>
  );
};

export default Home;
