import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";
import Flex from "../Flex";
import Text from "../Text";

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
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`;
const Footer = ({ title, height, bgColor, fColor, children }) => {
  return (
    <FooterFlex
      data-testid={"footer-1"}
      height={height}
      bgColor={bgColor}
      fColor={fColor}
    >
      <FooterItem>
        <Text
          content={title}
          bgColor={"black"}
          fColor={"white"}
          fontSize={0.75}
        ></Text>
      </FooterItem>
    </FooterFlex>
  );
};

export default Footer;
