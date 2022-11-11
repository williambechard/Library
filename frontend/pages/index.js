import React, { useState } from "react";
import Head from "next/head";
import {
  AddBookForm,
  Banner,
  Button,
  Card,
  Flex,
  Modal,
  Section,
  ViewBookPage,
} from "../components";
import DULogo from "../public/DU-Logo-Mark.svg";
import Text from "../components/Text/Text";
import Image from "next/image";
import { allBooksQueryBasic, useGetBooks } from "../api/books";
import Colors from "../components/colors";

/**
 * Main landing page of the application
 */
const Home = () => {
  /**
   * States
   */
  const [showAddBookModal, setAddBookModal] = useState(false); //Determines if AddBook Modal is shown or not
  const [showViewBookModal, setShowViewBookModal] = useState(false); //Determines if ViewBook Modal is shown or not
  const [bookId, setBookId] = useState("0"); //Keeps track of selected book ID so the correct book can be loaded into the ViewBook Modal

  //Apollo acts as state management <- look into to remove bookId etc

  //books will show new value once its been updated

  /**
   * Hook for query to get all books, so that they can be displayed on the page
   * allBooksQueryBasic is a gql query which is crafted to only pull the data we want for the books
   */
  const { books, update } = useGetBooks(allBooksQueryBasic);

  //? Any advantage writing a function this way over function(){}
  /**
   * Function for showing a modal.
   * Uses passed parameters so that ANY Modal state
   * can be set, and therefor shown with this function.
   * @param setModal -The Function which sets the State's value
   * @param ModalValue -The current value of the state
   */
  const triggerModal = (setModal, ModalValue) => {
    setModal(!ModalValue); //Look into react state batching and how to get most current state
  };

  /**
   * Function for setting the bookId state to the currently selected book
   * Called from the Card's onClick event
   * also Opens the ViewBook Modal, by settings its state
   * @param id - the id of the currently selected book
   */
  const showBook = (id) => {
    setBookId(id); //set the bookId state to the current book id
    setShowViewBookModal(!showViewBookModal); //set the viewBook modal state to the opposite, therefor showing the modal
  };

  /**
   * Function which coverts loaded books data to JSX (Card Components)
   */
  const displayBooks = () => {
    return books.map((book) => {
      //loop through all books
      return (
        //for each book return JSX of a Card Component
        <Card key={book.id} onClick={() => showBook(book.id)}>
          <Text
            bgColor={Colors.Mono[2]}
            fontSize={1}
            content={book.title}
            fontWeight={"900"}
            display={"block"}
          ></Text>
          <Text
            bgColor={Colors.Mono[2]}
            fColor={Colors.Mono[Colors.Mono.length - 2]}
            fontSize={1}
            margin={"20px 0px"}
            display={"block"}
            content={book.author.firstName + " " + book.author.lastName}
          ></Text>
        </Card>
      );
    });
  };

  /**
   * returns JSX
   */
  return (
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section bgColor={Colors.Mono[1]} height={"100%"}>
        <Flex
          position={"fixed"}
          top={"0"}
          left={"0"}
          zIndex={"2"}
          justifyContent={"flex-start"}
          alignContent={"flex-start"}
          gap={"15px"}
          height={"70px"}
          wrap={"wrap"}
        >
          <div style={{ margin: "10px", display: "inline-block" }}>
            <Image src={DULogo} alt={"DULogo"} width={"50px"} height={"50px"} />
          </div>
          <Text
            content={"William's Capstone"}
            fontSize={"1.70"}
            fontWeight={"1000"}
            margin={"auto 10px"}
            height={"100%"}
          />
        </Flex>
        <Section height={"100vh"} bgColor={Colors.Mono[1]}>
          <Flex
            bgColor={Colors.Mono[1]}
            justifyContent={"space-between"}
            position={"fixed"}
            top={"70px"}
            left={"0"}
            zIndex={"2"}
            height={"70px"}
          >
            <Text
              content={"My Library"}
              bgColor={Colors.Mono[1]}
              fontSize={1.5}
              margin={"auto 20px"}
            />
            <Button
              content={"+ Add Book"}
              onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
              margin={"auto 10px"}
            />
          </Flex>
          {books.length > 0 ? (
            <Flex
              justifyContent={"flex-start"}
              alignContent={"center"}
              bgColor={Colors.Mono[1]}
              wrap={"wrap"}
              zIndex={"0"}
              transform={"TranslateY(150px)"}
            >
              {displayBooks()}
            </Flex>
          ) : null}
          {showAddBookModal ? (
            <Modal
              onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
              title={"Add New Book"}
            >
              <AddBookForm
                onSubmit={update}
                onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
              />
            </Modal>
          ) : null}
          {showViewBookModal ? (
            <Modal
              onClick={() =>
                triggerModal(setShowViewBookModal, showViewBookModal)
              }
              title={"View Book"}
            >
              <ViewBookPage
                bookId={bookId}
                onClick={() => setShowViewBookModal(!showViewBookModal)}
              ></ViewBookPage>
            </Modal>
          ) : null}
        </Section>
        <Flex
          bgColor={Colors.Mono[Colors.Mono.length - 1]}
          justifyContent={"center"}
          height={"30px"}
          position={"fixed"}
          bottom={"0"}
        >
          <Text
            content={"@ 2022 Omni Federal - All Rights Reserved"}
            bgColor={Colors.Mono[Colors.Mono.length - 1]}
            fColor={Colors.Mono[0]}
            fontSize={1}
            margin={"auto 10px"}
          />
        </Flex>
      </Section>
    </>
  );
};

export default Home;
