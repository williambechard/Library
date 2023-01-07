import React from "react";
import { Text, Section, Flex } from "../index";
import { useGetBook } from "../../api/books";

/**
 * Component which is responsible for the inside of the Modal which shows the Book Info
 * @param bookId - Id of the book we want to view
 * @param onClick - function to be called when close is clicked
 * @returns {JSX.Element}
 */
const ViewBookPage = ({ bookId, onClick }) => {
  /**
   * Hook for getting info from a book based on a bookId
   */
  const { bookLoading, bookError, book } = useGetBook(bookId);

  return (
    <Section height={"60vh"} width={"100%"}>
      {!bookLoading && !bookError ? (
        <Flex
          direction={"column"}
          justifyContent={"flex-start"}
          alignContent={"center"}
          width={"100%"}
        >
          <Flex
            direction={"row"}
            justifyContent={"flex-start"}
            alignContent={"flex-start"}
            warp={"wrap"}
            height={"1.25rem"}
          >
            <Text
              content={"My Library "}
              clickable={true}
              onClick={onClick}
              display={"inline-block"}
              fontSize={"0.75"}
            />
            <Text
              content={"/" + book.title}
              display={"inline-block"}
              aria-label={"return"}
              fontSize={"0.75"}
            />
          </Flex>
          <Text
            content={book.title}
            fontSize={"1.5"}
            fontWeight={"600"}
            margin={"20px 0 20px 0"}
          />
          <Text
            content={book.author.firstName + " " + book.author.lastName}
            fontSize={"1"}
            fontWeight={"100"}
            margin={"10px  0 10px 0"}
          />
          <Text
            content={"Description"}
            margin={"10px  0 10px 0"}
            fontSize={"1.15"}
            fontWeight={"200"}
          />
          <Text
            content={book.description}
            margin={"20px  0 10px 0"}
            fontSize={"1"}
            fontWeight={"400"}
            maxHeight={"35vh"}
            overflow={"auto"}
          />
        </Flex>
      ) : (
        <Text content={"Loading..."} />
      )}
    </Section>
  );
};

export default ViewBookPage;
