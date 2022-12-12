import React from "react";
import styled from "@emotion/styled";
import Colors from "../colors";

/**
 * Styling based on button element
 */
const StyledButton = styled.button`
  ${(props) => `
  font-size:${props.fontSize};
  background-color:${props.bgColor};
  color:${props.fColor};
  border-color:${props.borderColor};
  margin:${props.margin};
  font-weight:${props.fontWeight};
 `}
  display: inline-block;
  padding: 5px 10px;
  border-radius: 10px;
  @media screen and (min-width: 300px) {
    padding: 5px 15px;
    font-size: ${(props) => props.fontSize / 1.5}rem;
  }
  @media screen and (min-width: 800px) {
    padding: 10px 20px;
    font-size: ${(props) => props.fontSize}rem;
  }
  &:hover {
    background-color: ${Colors.Mono[2]};
    cursor: pointer;
  }
`;

const Button = ({
  fontWeight = "400",
  label = "Test",
  fontSize = "1",
  bgColor = Colors.Mono[0],
  fColor = Colors.Mono[Colors.Mono.length - 1],
  borderColor = Colors.Mono[Colors.Mono.length - 1],
  margin = "unset",
  btnType = "button",
  onClick,
}) => {
  return (
    <StyledButton
      data-testid={"button-1"}
      aria-label={label}
      type={btnType}
      onClick={onClick}
      margin={margin}
      borderColor={borderColor}
      fColor={fColor}
      bgColor={bgColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
