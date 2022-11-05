import React from "react";
import styled from "@emotion/styled";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: ${(props) =>
    props.templateRows ? props.templateRows : "auto 1fr auto"};
  height: ${(props) => (props.height ? props.height : "100vh")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "0")};
`;

const Page = ({
  children,
  templateRows = "auto 1fr auto",
  borderRadius = "0",
  height = "100vh",
}) => {
  return (
    <StyledPage
      data-testid={"page-1"}
      height={height}
      borderRadius={borderRadius}
      templateRows={templateRows}
    >
      {children}
    </StyledPage>
  );
};

export default Page;