import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";

const TextItem = styled.div`
  user-select: ${(props) => (props.selectable ? props.selectable : "auto")};
  display: ${(props) => (props.display ? props.display : "inline-block")};
  font-size: ${(props) => props.fontSize / 1.5}rem;
  @media screen and (min-width: 300px) {
    font-size: ${(props) => props.fontSize / 1.25}rem;
  }
  @media screen and (min-width: 800px) {
    font-size: ${(props) => props.fontSize}rem;
  }
  ${(props) =>
    props.onClick &&
    `
    text-decoration:underline dotted;
    cursor: pointer;
     &:hover {
        text-decoration:underline;
        color:blue;
        text-weight:bold
      }
    
  `}
  text-align: left;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  color: ${(props) => (props.fColor ? props.fColor : "black")};
  font-family: Poppins, serif;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
  overflow: ${(props) => (props.overflow ? props.overflow : "hidden")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "40vh")}; ;
`;
const Text = ({
  content,
  bgColor,
  fColor,
  fontSize,
  margin = "0 0 0 0",
  fontWeight = "400",
  selectable = "auto",
  display = "inline-block",
  overflow = "hidden",
  maxHeight,
  onClick,
}) => {
  return (
    <TextItem
      data-testid={"text-1"}
      bgColor={bgColor}
      fColor={fColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      margin={margin}
      display={display}
      selectable={selectable}
      overflow={overflow}
      onClick={onClick}
      maxHeight={maxHeight}
    >
      {content}
    </TextItem>
  );
};

export default Text;
