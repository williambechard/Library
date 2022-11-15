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
      <label htmlFor={labelText}>
        <Text
          content={labelText}
          fontSize={1}
          fontWeight={"1000"}
          fColor={
            errors?.[labelText]
              ? Colors.Bright[1]
              : Colors.Mono[Colors.Mono.length - 1]
          }
        />
      </label>
      <StyledInput
        type={"text"}
        aria-label={labelText}
        id={labelText}
        title={labelText}
        rows={rows}
        resize={resize}
        name={labelText}
        aria-invalid={errors?.[labelText] ? "true" : "false"}
        {...register(labelText, {
          required: "Required",
          minLength: 1,
          maxLength: 800,
        })}
      />
      {errors?.[labelText] && errors?.[labelText].type === "required" && (
        <Text
          role={"alert"}
          content={"Input is Required"}
          fontWeight={"1000"}
          fontSize={"1"}
          fColor={Colors.Bright[1]}
        />
      )}
      {errors?.[labelText] && errors?.[labelText].type === "maxLength" && (
        <Text
          role={"alert"}
          content={"Max length exceeded"}
          fontWeight={"1000"}
          fontSize={"1"}
          fColor={Colors.Bright[1]}
        />
      )}
    </StyledLabel>
  );
};

export default MultiLineInput;
