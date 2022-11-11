import React from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import Colors from "../colors";

/**
 * Style component based on a textarea
 */
const StyledInput = styled.textarea`
  width: inherit;
  resize: ${(props) => props.resize};
  font-size: 1rem;
  border-radius: 6px;
  color: ${Colors.Mono[Colors.Mono.length - 1]};
  border: 1px solid ${Colors.Mono[4]};
  padding-left: 0.5rem;
  box-sizing: border-box;
`;

/**
 * Style component based on a label element
 * Styling used for the label part of the input element
 */
const StyledLabel = styled.label`
  width: inherit;
`;

const MultiLineInput = ({
  register,
  labelText = "Label",
  errors,
  rows,
  resize = "none",
}) => {
  return (
    <StyledLabel>
      <Text
        aria-label={labelText}
        content={labelText}
        fontSize={1}
        fontWeight={"1000"}
        fColor={
          errors?.[labelText]
            ? Colors.Bright[1]
            : Colors.Mono[Colors.Mono.length - 1]
        }
      />
      <StyledInput
        type={"text"}
        rows={rows}
        resize={resize}
        name={labelText}
        label={labelText}
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
          fColor={Colors.Bright[1]}
        />
      )}
    </StyledLabel>
  );
};

export default MultiLineInput;
