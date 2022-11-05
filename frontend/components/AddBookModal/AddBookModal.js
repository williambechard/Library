import React from "react";
import styled from "@emotion/styled";
import {
  Banner,
  Section,
  Button,
  Text,
  Page,
  Form,
  SingleLineInput,
  MultiLineInput,
  Flex,
} from "../index";
import { useForm } from "react-hook-form";
import { useAddBook } from "../../api/books";
import { useAddAuthor, useGetAuthors } from "../../api/authors";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  max-height: 100%;
  z-index: 2;
  background-color: white;
  border-radius: 15px;
`;

const StyledBG = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const AddBookModal = ({ onClickHandler, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addBook } = useAddBook();
  const { addAuthor } = useAddAuthor();
  const { authors } = useGetAuthors();
  const submitForm = async (data) => {
    console.log(data);
    const title = data.Title;
    const description = data.Description;
    const fName = data["First Name"];
    const lName = data["Last Name"];

    const findAuthor = await authors.filter(
      (author) => author.firstName === fName && author.lastName === lName
    );

    let targetAuthor = {};

    if (findAuthor.length) targetAuthor = findAuthor[0];
    else {
      targetAuthor = await addAuthor(fName, lName);
      targetAuthor = targetAuthor.data.addAuthor;
    }

    const newBook = await addBook(
      title,
      targetAuthor.id,
      "",
      [""],
      description
    );
    await onSubmit();
    onClickHandler();
  };

  return (
    <StyledBG>
      <StyledModal>
        <Page
          borderRadius={"15px 15px 15px 15px"}
          templateRows={"auto"}
          height={"unset"}
        >
          <Banner
            bgColor={"white"}
            justifyContent={"space-between"}
            borderRadius={"15px 15px 0px 0px"}
            height={"75px"}
          >
            <Text
              content={"Add New Book"}
              bgColor={"white"}
              fontSize={1.5}
              fontWeight={"1000"}
            />
            <Button
              content={"X"}
              onClickHandler={onClickHandler}
              fontWeight={"1000"}
            />
          </Banner>
          <Section bgColor={"white"} borderRadius={"0 0 15px 15px"}>
            <Form onHandleSubmit={handleSubmit(submitForm)}>
              <SingleLineInput
                labelText={"Title"}
                register={register}
                errors={errors}
                width={"100%"}
              />
              <Flex direction={"column"} justifyContent={"flex-start"}>
                <SingleLineInput
                  labelText={"First Name"}
                  register={register}
                  errors={errors}
                  width={"100%"}
                />
                <SingleLineInput
                  labelText={"Last Name"}
                  register={register}
                  errors={errors}
                  width={"100%"}
                />
              </Flex>
              <Flex
                height={"200px"}
                direction={"column"}
                justifyContent={"flex-end"}
                alignContent={"flex-end"}
              >
                <MultiLineInput
                  labelText={"Description"}
                  rows={5}
                  register={register}
                  errors={errors}
                />
              </Flex>
              <Flex
                justifyContent={"flex-end"}
                alignContent={"flex-end"}
                height={"50px"}
                padding={"30px 0px 0px 0px"}
              >
                <Button
                  fColor={"red"}
                  borderColor={"red"}
                  content={"Cancel"}
                  onClickHandler={onClickHandler}
                />
                <Text content={"_"} fColor={"white"} selectable={"none"} />
                <Button
                  fColor={"green"}
                  borderColor={"green"}
                  content={"Add Book"}
                  btnType={"Submit"}
                />
              </Flex>
            </Form>
          </Section>
        </Page>
      </StyledModal>
    </StyledBG>
  );
};

export default AddBookModal;
