import React, { useContext, useState } from 'react';
import {
  Section,
  Flex,
  Card,
  Text,
  ViewBookPage,
  Modal,
  Button
} from '../components';
import colors from '../theme/colors';
import { BooksContext } from '../providers';
import triggerModal from '../helper/triggerModal';

const AuthorsPage = () => {
  const books = useContext(BooksContext);
  const [showViewBookModal, setShowViewBookModal] = useState(false); //Determines if ViewBook Modal is shown or not
  const [bookId, setBookId] = useState('0'); //Keeps track of selected book ID so the correct book can be loaded into the ViewBook Modal

  const showBook = id => {
    setBookId(id); //set the bookId state to the current book id
    setShowViewBookModal(visibleStatus => !visibleStatus); //set the viewBook modal state to the opposite, therefor showing the modal
  };

  //weird lint error saying modalValue not used, but it is in the function...
  /**
   * Function for showing a modal.
   * Uses passed parameters so that ANY Modal state
   * can be set, and therefor shown with this function.
   * @param setModal -The Function which sets the State's value
   * @param modalValue -The current value of the state
   */
  const triggerModal = (setModal, modalValue) => {
    setModal(modalValue => !modalValue); //uses arrow function to make sure current value is used and not stale data
  };

  const displayBooksByAuthor = arr => {
    return arr.map(item => {
      return (
        <Card
          key={item.id}
          label={item.title}
          onClick={() => {
            setBookId(item.id);
            triggerModal(setShowViewBookModal, showViewBookModal);
          }}
        >
          <Text
            bgColor={colors.mono[2]}
            fontSize={'1'}
            fontWeight={'900'}
            display={'block'}
          >
            <span>{item.title}</span>
          </Text>
        </Card>
      );
    });
  };

  const displayBooks = () => {
    let allAuthors = {};

    books.map(book => {
      let id =
        book.author.id +
        '-' +
        book.author.firstName +
        ' ' +
        book.author.lastName;

      if (!allAuthors.hasOwnProperty(id)) allAuthors[id] = [];

      allAuthors[id].push(book);
    });

    let jsxArray = [];
    for (var key in allAuthors) {
      jsxArray.push(
        <Flex
          height={'unset'}
          margin={'20px'}
          justifyContent={'flex-start'}
          bgColor={colors.mono[1]}
          key={key.split('-')[0]}
        >
          <Text
            margin={'0px 0px 0px 20px'}
            bgColor={colors.mono[1]}
            fontSize={'2'}
          >
            {key.split('-')[1]}
          </Text>
          <Flex height={'unset'} bgColor={colors.mono[1]}>
            {displayBooksByAuthor(allAuthors[key])}
          </Flex>
        </Flex>
      );
    }
    return <>{jsxArray}</>;
  };

  return (
    <>
      {books.length > 0 ? (
        <Flex
          justifyContent={'flex-start'}
          alignContent={'flex-start'}
          bgColor={colors.mono[1]}
          wrap={'wrap'}
          zIndex={'0'}
          gap={'50px'}
          transform={'translateY(80px)'}
        >
          {displayBooks()}
        </Flex>
      ) : (
        <Text>
          <span>No Books Found...</span>
        </Text>
      )}
      {showViewBookModal && (
        <Modal
          onClick={() => triggerModal(setShowViewBookModal, showViewBookModal)}
          title={'Book Info'}
        >
          <ViewBookPage
            bookId={bookId}
            returnPath={'Authors'}
            onClick={() =>
              triggerModal(setShowViewBookModal, showViewBookModal)
            }
          />
        </Modal>
      )}
    </>
  );
};

export default AuthorsPage;
