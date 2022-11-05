import React from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";

const StyledInput = styled.textarea`
  width: inherit;
  resize: ${(props) => (props.resize ? props.resize : "none")};
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid grey;
  padding-left: 0.5rem;
  box-sizing: border-box;
`;

const StyledLabel = styled.label`
  width: inherit;
`;

const MultiLineInput = ({
  children,
  labelText,
  rows = 1,
  resize = "none",
  register,
  errors,
}) => {
  return (
    <StyledLabel>
      <Text
        content={labelText}
        fontSize={1}
        fontWeight={"1000"}
        fColor={errors?.[labelText] ? "red" : "black"}
      />
      <StyledInput
        type={"text"}
        rows={rows}
        resize={resize}
        name={labelText}
        {...register(labelText, {
          required: "Required",
          minLength: 1,
          maxLength: 800,
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
    </StyledLabel>
  );
};

export default MultiLineInput;
