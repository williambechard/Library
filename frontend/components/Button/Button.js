import React from "react";
import styled from "@emotion/styled";
import Flex from "../Flex/Flex";

const StyledButton = styled.button`
  display: inline-block;
  margin:${(props) => (props.margin ? props.margin : "unset")};
  color:${(props) => (props.fColor ? props.fColor : "black")};
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
    background-color: #BEBEBE;
    cursor: pointer;
  }
  }
`;
const Button = ({
  fontWeight = "400",
  content,
  fontSize = "1",
  bgColor = "black",
  fColor = "black",
  borderColor,
  margin = "unset",
  btnType = "button",
  onClickHandler,
}) => {
  return (
    <Flex alignContent={"center"} justifyContent={"flex-end"} width={"unset"}>
      <StyledButton
        bgColor={bgColor}
        fColor={fColor}
        borderColor={borderColor}
        fontSize={fontSize}
        onClick={onClickHandler}
        fontWeight={fontWeight}
        margin={margin}
        type={btnType}
      >
        {content}
      </StyledButton>
    </Flex>
  );
};

export default Button;
