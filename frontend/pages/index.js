import React, { useState } from "react";
import Head from "next/head";
import {
  Banner,
  Section,
  Button,
  Page,
  AddBookModal,
  Flex,
  Card,
} from "../components";
import DULogo from "../public/DU-Logo-Mark.svg";
import Text from "../components/Text/Text";
import Image from "next/image";

import { useGetBooksSimple } from "../api/books";

const Home = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const { books, update } = useGetBooksSimple();

  const triggerModal = () => {
    setModalStatus(!modalStatus);
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
          <Image src={DULogo} width={50} height={50} />
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
            <Button content={"+ Add Book"} onClickHandler={triggerModal} />
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
              {books.map((book, index) => {
                return (
                  <Card key={index}>
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
                      content={
                        book.author.firstName + " " + book.author.lastName
                      }
                    ></Text>
                  </Card>
                );
              })}
            </Flex>
          ) : null}
          {modalStatus ? (
            <AddBookModal onSubmit={update} onClickHandler={triggerModal} />
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
