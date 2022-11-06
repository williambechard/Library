import React, { useState } from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";

const StyledInput = styled.input`
  font-size: 1rem;
  height: 2rem;
  border-radius: 6px;
  border: 1px solid grey;
  padding-left: 0.5rem;
  width: ${(props) => (props.width ? props.width : "unset")};
  box-sizing: border-box;
`;

const StyledDiv = styled.div`
  margin-bottom: 20px;
  width: ${(props) => (props.width ? props.width : "unset")};
`;

const SingleLineInput = ({
  children,
  labelText,
  rows = "1",
  resize = "none",
  register,
  width = "unset",
  errors,
}) => {
  const [errorState, setErrorState] = useState(errors);
  return (
    <StyledDiv width={width}>
      <Text
        content={labelText}
        fontSize={1}
        fontWeight={"1000"}
        fColor={errors?.[labelText] ? "red" : "black"}
        display={"block"}
      />
      <StyledInput
        type={"text"}
        rows={rows}
        resize={resize}
        name={labelText}
        width={width}
        {...register(labelText, {
          required: "Required",
          minLength: 1,
          maxLength: 110,
        })}
      />
      {errors?.[labelText] && (
        <Text
          content={"Input not valid!"}
          fontWeight={"1000"}
          fontSize={1}
          fColor={"red"}
        />
      )}
    </StyledDiv>
  );
};

export default SingleLineInput;
