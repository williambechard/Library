import React, { useState } from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import Colors from "../colors";

/**
 * Style component based on the input element
 */
const StyledInput = styled.input`
  ${(props) => `
  color: ${Colors.Mono[Colors.Mono.length - 1]};
  font-size: 1rem;
  height: 2rem;
  border-radius: 6px;
  border: 1px solid ${Colors.Mono[4]};
  padding-left: 0.5rem;
  width: ${props.width};
  box-sizing: border-box;
`};
`;

/**
 * Style component based on a div element
 * Styling for label part of the input
 */
const StyledDiv = styled.div`
  margin-bottom: 20px;
`;

const SingleLineInput = ({
  labelText = "Label",
  errors,
  register,
  width = "100%",
}) => {
  return (
    <StyledDiv labelText={labelText} data-testid={"div-1"}>
      <Text
        aria-label={labelText}
        content={labelText}
        fontWeight={"1000"}
        fontSize={1}
        fColor={
          errors?.[labelText]
            ? Colors.Bright[1]
            : Colors.Mono[Colors.Mono.length - 1]
        }
      />
      <StyledInput
        type={"text"}
        name={labelText}
        label={labelText}
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
          fColor={Colors.Bright[1]}
        />
      )}
    </StyledDiv>
  );
};

export default SingleLineInput;
