import React from "react";
import styled from "@emotion/styled";
import {
  Button,
  Text,
  Page,
  SingleLineInput,
  MultiLineInput,
  Flex,
} from "../index";
import { useGetBook } from "../../api/books";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  max-height: 100%;
  z-index: 4;
  background-color: white;
  border-radius: 15px;
`;

const StyledBG = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ViewBookPage = ({ bookId, onClickClose }) => {
  const { bookLoading, bookError, book } = useGetBook(bookId);
  return (
    <Page height={"60vh"}>
      {!bookLoading && !bookError ? (
        <>
          <Flex
            direction={"column"}
            justifyContent={"space-around"}
            alignContent={"center"}
          >
            <>
              <Text content={"My Library / "} fontSize={0.75} />
              <Text content={book.title} onClick={onClickClose} />
            </>
            <Text
              content={book.title}
              fontSize={1.5}
              fontWeight={"600"}
              margin={"20px 0 20px 0"}
            />
            <Text
              content={book.author.firstName + " " + book.author.lastName}
              fontSize={1}
              fontWeight={"100"}
              margin={"10px  0 10px 0"}
            />
            <Text
              content={"Description"}
              margin={"10px  0 10px 0"}
              fontSize={1.15}
              fontWeight={"200"}
            />
            <Text
              content={book.description}
              margin={"20px  0 10px 0"}
              fontSize={1}
              fontWeight={"400"}
              maxHeight={"26vh"}
              overflow={"auto"}
            />
          </Flex>
        </>
      ) : (
        <Text content={"Loading..."} />
      )}
    </Page>
  );
};

export default ViewBookPage;
