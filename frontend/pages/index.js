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
import { allBooksQueryBasic, useGetBooks } from "../api/books";
import Colors from "../components/colors";

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
      <Page bgColor={Colors.Mono[1]}>
        <Banner position={"fixed"} top={"0"} left={"0"} zIndex={"2"}>
          <div style={{ margin: "auto 20px" }}>
            <Image src={DULogo} alt={"DULogo"} width={"50px"} height={"50px"} />
          </div>
          <Text
            content={"William's Capstone"}
            fontSize={2}
            fontWeight={"1000"}
            margin={"auto 10px"}
          />
        </Banner>
        <Section>
          <Banner
            bgColor={Colors.Mono[1]}
            justifyContent={"space-between"}
            position={"fixed"}
            top={"100px"}
            left={"0"}
            zIndex={"2"}
          >
            <Text
              content={"My Library"}
              bgColor={Colors.Mono[1]}
              fontSize={1.5}
              margin={"auto 20px"}
            />
            <Button
              content={"+ Add Book"}
              onClickHandler={() =>
                triggerModal(setAddBookModal, showAddBookModal)
              }
              margin={"auto 10px"}
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
          bgColor={Colors.Mono[Colors.Mono.length - 1]}
          justifyContent={"center"}
          height={"30px"}
          footer={true}
        >
          <Text
            content={"@ 2022 Omni Federal - All Rights Reserved"}
            bgColor={Colors.Mono[Colors.Mono.length - 1]}
            fColor={Colors.Mono[0]}
            fontSize={1}
            margin={"auto 10px"}
          />
        </Banner>
      </Page>
    </>
  );
};

export default Home;
