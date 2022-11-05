import React from "react";
import styled from "@emotion/styled";
import Flex from "../Flex";

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

const Form = ({ children, onHandleSubmit }) => {
  return (
    <StyledForm onSubmit={onHandleSubmit}>
      <Flex direction={"column"} justifyContent={"center"}>
        {children}
      </Flex>
    </StyledForm>
  );
};

export default Form;
