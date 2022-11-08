import React from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import Colors from "../colors";

const StyledInput = styled.textarea`
  width: inherit;
  resize: ${(props) => (props.resize ? props.resize : "none")};
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${Colors.Mono[4]};
  padding-left: 0.5rem;
  box-sizing: border-box;
`;

const StyledLabel = styled.label`
  width: inherit;
`;

const MultiLineInput = ({ children, ...props }) => {
  const register = props.register;
  return (
    <StyledLabel>
      <Text
        content={props.labelText}
        fontSize={1}
        fontWeight={"1000"}
        fColor={
          props.errors?.[props.labelText]
            ? Colors.Bright[1]
            : Colors.Mono[Colors.Mono.length - 1]
        }
      />
      <StyledInput
        type={"text"}
        rows={props.rows}
        resize={props.resize}
        name={props.labelText}
        label={props.labelText}
        {...register(props.labelText, {
          required: "Required",
          minLength: 1,
          maxLength: 800,
        })}
      />
      {props.errors?.[props.labelText] && (
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
