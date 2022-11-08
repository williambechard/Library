import React from "react";
import styled from "@emotion/styled";
import Colors from "../colors";

/**
 * Style component based on a div element
 */
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
        color:${Colors.Bright[2]};
        text-weight:bold
      }
    
  `}
  text-align: left;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : Colors.Mono[0]};
  color: ${(props) =>
    props.fColor ? props.fColor : Colors.Mono[Colors.Mono.length - 1]};
  font-family: Poppins, serif;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
  overflow: ${(props) => (props.overflow ? props.overflow : "hidden")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight : "40vh")}; ;
`;
const Text = ({ ...props }) => {
  return (
    <TextItem data-testid={"text-1"} {...props}>
      {props.content}
    </TextItem>
  );
};

export default Text;
