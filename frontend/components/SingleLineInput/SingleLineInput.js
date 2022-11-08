import React, { useState } from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import Colors from "../colors";

const StyledInput = styled.input`
  color: ${(props) =>
    props.fColor ? props.fColor : Colors.Mono[Colors.Mono.length - 1]};
  font-size: 1rem;
  height: 2rem;
  border-radius: 6px;
  border: 1px solid ${Colors.Mono[4]};
  padding-left: 0.5rem;
  width: ${(props) => (props.width ? props.width : "unset")};
  box-sizing: border-box;
`;

const StyledDiv = styled.div`
  margin-bottom: 20px;
  width: ${(props) => (props.width ? props.width : "unset")};
`;

const SingleLineInput = ({ children, ...props }) => {
  const [errorState, setErrorState] = useState(props.errors);
  const register = props.register;
  return (
    <StyledDiv {...props}>
      <Text
        content={props.labelText}
        fontWeight={"1000"}
        fontSize={1}
        fColor={
          props.errors?.[props.labelText]
            ? Colors.Bright[1]
            : Colors.Mono[Colors.Mono.length - 1]
        }
        {...props}
      />
      <StyledInput
        type={"text"}
        name={props.labelText}
        label={props.labelText}
        {...register(props.labelText, {
          required: "Required",
          minLength: 1,
          maxLength: 110,
        })}
        {...props}
      />
      {props.errors?.[props.labelText] && (
        <Text
          content={"Input not valid!"}
          fontWeight={"1000"}
          fontSize={1}
          fColor={Colors.Bright[1]}
          {...props}
        />
      )}
    </StyledDiv>
  );
};

export default SingleLineInput;
