import React from "react";
import styled from "@emotion/styled";
import { Button, SingleLineInput, MultiLineInput, Flex } from "../index";
import { useForm } from "react-hook-form";
import { useAddBook } from "../../api/books";
import { useAddAuthor, useGetAuthors } from "../../api/authors";
import useToast from "../../hooks/useToast";
import Colors from "../colors";

/**
 * Style component based on a form
 */
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

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

const AddBookForm = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addBook } = useAddBook();
  const { addAuthor } = useAddAuthor();
  const { authors } = useGetAuthors();
  const [, setToast] = useToast();

  const findAuthor = (fName, lName) => {
    return authors.find(
      (author) => author.firstName === fName && author.lastName === lName
    );
  };

  const submitForm = async (data) => {
    const title = data.Title;
    const description = data.Description;
    const fName = data["First Name"];
    const lName = data["Last Name"];

    let targetAuthor = {};

    targetAuthor = findAuthor(fName, lName);

    if (typeof targetAuthor === "undefined") {
      targetAuthor = await addAuthor(fName, lName).catch((err) => {
        console.log("error ", err);
        return false;
      });

      targetAuthor = targetAuthor.data.addAuthor;
    }

    const newBook = addBook(title, targetAuthor.id, "", [""], description)
      .then((data) => {
        setToast({
          type: "success",
          message:
            "The Book " + title + " was succesfully added to the Library",
        });
        //I want the form to close after submit, so make sure this happens
        onClick();
      })
      .catch((error) => {
        setToast({
          type: "error",
          message:
            "The Book " +
            title +
            "FAILED to added to the Library. ERROR: " +
            error,
        });
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitForm)} data-testid={"form-1"}>
      <Flex
        direction={"column"}
        wrap={"nowrap"}
        justifyContent={"center"}
        borderRadius={"15px"}
      >
        <SingleLineInput
          labelText={"Title"}
          register={register}
          errors={errors}
          width={"100%"}
        />
        <Flex
          direction={"row"}
          justifyContent={"flex-start"}
          wrap={"nowrap"}
          gap={"10px"}
        >
          <SingleLineInput
            labelText={"First Name"}
            register={register}
            errors={errors}
          />
          <SingleLineInput
            labelText={"Last Name"}
            register={register}
            errors={errors}
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
          gap={"10px"}
        >
          <Button
            fColor={Colors.Bright[1]}
            borderColor={Colors.Bright[1]}
            content={"Cancel"}
            onClick={onClick}
          />
          <Button
            fColor={Colors.Bright[0]}
            borderColor={Colors.Bright[0]}
            content={"Add Book"}
            btnType={"submit"}
          />
        </Flex>
      </Flex>
    </StyledForm>
  );
};

export default AddBookForm;
