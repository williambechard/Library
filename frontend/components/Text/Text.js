import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";

const TextItem = styled.div`
  display: inline-block;
  font-size: ${(props) => props.fontSize / 2.5}rem;
  @media screen and (min-width: 300px) {
    font-size: ${(props) => props.fontSize / 1.5}rem;
  }
  @media screen and (min-width: 800px) {
    font-size: ${(props) => props.fontSize}rem;
  }
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  color: ${(props) => (props.fColor ? props.fColor : "black")};
  font-family: Poppins, serif;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
`;
const Text = ({ content, bgColor, fColor, fontSize, fontWeight }) => {
  return (
    <TextItem
      data-testid={"text-1"}
      bgColor={bgColor}
      fColor={fColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {content}
    </TextItem>
  );
};

export default Text;
