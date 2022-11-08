import React from "react";
import styled from "@emotion/styled";
import Flex from "../Flex";

/**
 * Style component based on a form
 */
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

const Form = ({ children, ...props }) => {
  return (
    <StyledForm data-testid="form-1" onSubmit={props.onHandleSubmit}>
      <Flex direction={"column"} justifyContent={"center"}>
        {children}
      </Flex>
    </StyledForm>
  );
};

export default Form;
