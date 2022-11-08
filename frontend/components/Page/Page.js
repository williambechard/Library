import React from "react";
import styled from "@emotion/styled";
import Colors from "../colors";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: ${(props) =>
    props.templateRows ? props.templateRows : "auto 1fr auto"};
  height: ${(props) => (props.height ? props.height : "100vh")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : Colors.Mono[0]};
`;

const Page = ({ children, ...props }) => {
  return (
    <StyledPage data-testid={"page-1"} {...props}>
      {children}
    </StyledPage>
  );
};

export default Page;
