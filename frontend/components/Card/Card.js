import React from "react";
import styled from "@emotion/styled";
import Colors from "../colors";

/**
 * Style component based on a div element
 */
const StyledCard = styled.div`
  padding: 20px 10px;
  margin: 10px;
  background-color: #bfbfbf;
  width: 100px;
  height: 150px;
  border: 0.2rem solid transparent;
  box-shadow: 5px 5px 10px #a9a9a9;
  cursor: pointer;
  &:hover {
    border: 0.2rem solid ${Colors.Mono[Colors.Mono.length - 1]};
    box-shadow: 5px 10px 20px ${Colors.Mono[3]};
  }
`;

const Card = ({ children, label = "Moby Dick", onClick }) => {
  return (
    <StyledCard
      aria-label={"Book Card " + label}
      onClick={onClick}
      data-testid={"card-1"}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
