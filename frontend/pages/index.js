import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Banner,
  Section,
  Button,
  Page,
  AddBookForm,
  ViewBookPage,
  Flex,
  Card,
  Modal,
} from "../components";
import DULogo from "../public/DU-Logo-Mark.svg";
import Text from "../components/Text/Text";
import Image from "next/image";
import { allBooksQueryBasic, useGetBook, useGetBooks } from "../api/books";

const Home = () => {
  const [showAddBookModal, setAddBookModal] = useState(false);
  const [showViewBookModal, setShowViewBookModal] = useState(false);
  const { books, update } = useGetBooks(allBooksQueryBasic);
  const [bookId, setBookId] = useState("0");

  const triggerModal = (setModal, ModalValue) => {
    setModal(!ModalValue);
  };

  const showBook = (id) => {
    setBookId(id);
    setShowViewBookModal(!showViewBookModal);
  };

  const displayBooks = () => {
    return books.map((book) => {
      return (
        <Card key={book.id} onClick={() => showBook(book.id)}>
          <Text
            bgColor={"#BFBFBF"}
            fontSize={1}
            content={book.title}
            fontWeight={"900"}
            display={"block"}
          ></Text>
          <Text
            bgColor={"#BFBFBF"}
            fColor={"#303030"}
            fontSize={1}
            margin={"20px 0px"}
            display={"block"}
            content={book.author.firstName + " " + book.author.lastName}
          ></Text>
        </Card>
      );
    });
  };

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
      <Page bgColor={"#DFDFDF"}>
        <Banner
          margin={"auto 20px"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          zIndex={"2"}
        >
          <Image src={DULogo} alt={"DULogo"} width={50} height={50} />
          <Text
            content={"William's Capstone"}
            fontSize={2}
            fontWeight={"1000"}
          />
        </Banner>
        <Section>
          <Banner
            bgColor={"#dfdfdf"}
            justifyContent={"space-between"}
            position={"fixed"}
            top={"100px"}
            left={"0"}
            zIndex={"2"}
          >
            <Text content={"My Library"} bgColor={"#dfdfdf"} fontSize={1.5} />
            <Button
              content={"+ Add Book"}
              onClickHandler={() =>
                triggerModal(setAddBookModal, showAddBookModal)
              }
            />
          </Banner>
          {books.length > 0 ? (
            <Flex
              justifyContent={"flex-start"}
              alignContent={"center"}
              style={{
                flexWrap: "wrap",
                zIndex: "0",
                transform: "TranslateY(150px)",
              }}
            >
              {displayBooks()}
            </Flex>
          ) : null}
          {showAddBookModal ? (
            <Modal
              onClickHandler={() =>
                triggerModal(setAddBookModal, showAddBookModal)
              }
              title={"Add New Book"}
            >
              <AddBookForm
                onSubmit={update}
                onClickHandler={() =>
                  triggerModal(setAddBookModal, showAddBookModal)
                }
              />
            </Modal>
          ) : null}
          {showViewBookModal ? (
            <Modal
              onClickHandler={() =>
                triggerModal(setShowViewBookModal, showViewBookModal)
              }
              title={"View Book"}
            >
              <ViewBookPage
                bookId={bookId}
                onClickClose={() => setShowViewBookModal(!showViewBookModal)}
              ></ViewBookPage>
            </Modal>
          ) : null}
        </Section>
        <Banner
          bgColor={"black"}
          justifyContent={"center"}
          height={"30px"}
          footer={true}
        >
          <Text
            content={"@ 2022 Omni Federal - All Rights Reserved"}
            bgColor={"black"}
            fColor={"white"}
            fontSize={1}
          />
        </Banner>
      </Page>
    </>
  );
};

export default Home;
