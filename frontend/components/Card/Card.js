import React from "react";
import styled from "@emotion/styled";

const StyledCard = styled.div`
  padding: 20px 10px;
  margin: 10px;
  background-color: #bfbfbf;
`;
const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
