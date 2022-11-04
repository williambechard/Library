import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";
import Flex from "../Flex";

const FooterFlex = styled(Flex)`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  height: ${(props) => (props.height ? props.height : "30px;")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "grey")};
  color: ${(props) => (props.fColor ? props.fColor : "white")};
`;

const FooterItem = styled.span`
  margin: auto 20px;
  font-size: small;
  font-weight: bold;
  color: ${colors.fColor};
  font-family: Poppins, serif;
`;
const Footer = ({ title, height, bgColor, fColor, children }) => {
  return (
    <FooterFlex
      data-testid={"footer-1"}
      height={height}
      bgColor={bgColor}
      fColor={fColor}
    >
      <FooterItem>{title}</FooterItem>
    </FooterFlex>
  );
};

export default Footer;
