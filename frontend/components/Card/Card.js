import React from "react";
import styled from "@emotion/styled";

const StyledCard = styled.div`
  padding: 20px 10px;
  margin: 10px;
  background-color: #bfbfbf;
  width: 100px;
  height: 150px;
  box-shadow: 5px 5px 10px #a9a9a9;
`;
const Card = ({ children }) => {
  return <StyledCard data-testid={"card-1"}>{children}</StyledCard>;
};

export default Card;
