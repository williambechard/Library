import React from "react";
import styled from "@emotion/styled";

const StyledCard = styled.div`
  padding: 20px 10px;
  margin: 10px;
  background-color: #bfbfbf;
  width: 100px;
  height: 150px;
  border: 0.2rem solid transparent;
  box-shadow: 5px 5px 10px #a9a9a9;
  ${(props) =>
    props.onClick &&
    `
    cursor: pointer;
    &:hover {
        border:.2rem solid black;
        box-shadow: 5px 10px 20px #a9a9a9;
      }
  `}
`;
const Card = ({ children, onClick }) => {
  return (
    <StyledCard data-testid={"card-1"} onClick={onClick}>
      {children}
    </StyledCard>
  );
};

export default Card;
