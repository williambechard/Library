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
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  color: ${(props) => (props.fColor ? props.fColor : "black")};
  font-family: Poppins, serif;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
  overflow: hidden;
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
    >
      {content}
    </TextItem>
  );
};

export default Text;
