import React, { useContext } from 'react';
import { Section, Flex, Card, Text } from '../components';
import colors from '../theme/colors';
import { BooksContext } from '../providers';

const AuthorsPage = () => {
  const books = useContext(BooksContext);
  const displayBooks = () => {
    return books.map(book => {
      //loop through all books
      return (
        //for each book return JSX of a Card Component
        <Card
          key={book.id}
          label={book.title}
          onClick={() => showBook(book.id)}
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

  return (
    <>
      <Section height={'100vh'} bgColor={colors.mono[1]}>
        <Flex
          bgColor={colors.mono[1]}
          justifyContent={'space-between'}
          position={'fixed'}
          top={'70px'}
          left={'0'}
          zIndex={'2'}
          height={'70px'}
        ></Flex>
        {books.length > 0 ? (
          <Flex
            justifyContent={'flex-start'}
            alignContent={'center'}
            bgColor={colors.mono[1]}
            wrap={'wrap'}
            zIndex={'0'}
            transform={'TranslateY(150px)'}
          >
            {displayBooks()}
          </Flex>
        ) : (
          <Text>
            <span>No Books Found...</span>
          </Text>
        )}
      </Section>
    </>
  );
};

export default AuthorsPage;
