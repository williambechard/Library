import React from "react";
import styled from "@emotion/styled";
import Flex from "../Flex/Flex";
import Colors from "../colors";

/**
 * Styling based on button element
 */
const StyledButton = styled.button`
  display: inline-block;
  margin:${(props) => (props.margin ? props.margin : "unset")};
  color:${(props) =>
    props.fColor ? props.fColor : Colors.Mono[Colors.Mono.length - 1]};
  padding: 5px 10px;
  border-radius: 10px;
  font-size: ${(props) => props.fontSize / 2}rem;
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : props.bgColor};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  @media screen and (min-width: 300px) {
    padding: 5px 15px;
    font-size: ${(props) => props.fontSize / 1.5}rem;
  }
  @media screen and (min-width: 800px) {
    padding: 10px 20px;
    font-size: ${(props) => props.fontSize}rem;
  }
  &:hover {
    background-color: ${Colors.Mono[2]};
    cursor: pointer;
  }
  }
`;

const Button = ({ ...props }) => {
  return (
    <Flex alignContent={"center"} justifyContent={"flex-end"} width={"unset"}>
      <StyledButton
        onClick={props.onClickHandler}
        type={props.btnType}
        {...props}
      >
        {props.content}
      </StyledButton>
    </Flex>
  );
};

export default Button;
