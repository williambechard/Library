import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";

const TextItem = styled.div`
  display: inline-block;
  font-size: 1rem;
  @media screen and (min-width: 300px) {
    font-size: 1.5rem;
  }
  @media screen and (min-width: 800px) {
    font-size: 2rem;
  }
  font-weight: bold;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  color: ${(props) => (props.fColor ? props.fColor : "black")};
  font-family: Poppins, serif;
`;
const Text = ({ content, bgColor = "white", fColor = "black" }) => {
  return (
    <TextItem data-testid={"text-1"} bgColor={bgColor} fColor={fColor}>
      {content}
    </TextItem>
  );
};

export default Text;
