import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";
import Flex from "../Flex";
import Image from "next/image";
import Text from "../Text/Text";

const HeaderFlex = styled(Flex)`
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
  height: ${(props) => (props.height ? props.height : "100px;")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "grey")};
  color: ${(props) => (props.fColor ? props.fColor : "white")};
`;

const HeaderItem = styled.div`
  display: inline-block;
  margin: auto 10px;
  font-size: 1rem;
  @media screen and (min-width: 300px) {
    font-size: 1.5rem;
  }
  @media screen and (min-width: 800px) {
    font-size: 2rem;
  }
  font-weight: bold;
  color: ${colors.fColor};
  font-family: Poppins, serif;
`;
const Header = ({
  title,
  icon,
  height,
  bgColor = "white",
  fColor = "black",
}) => {
  return (
    <HeaderFlex
      data-testid={"header-1"}
      height={height}
      bgColor={bgColor}
      fColor={fColor}
    >
      <HeaderItem>
        <Image width={"50px"} height={"50px"} src={icon} alt={"DU Logo"} />
      </HeaderItem>
      <HeaderItem>
        <Text content={title} />
      </HeaderItem>
    </HeaderFlex>
  );
};

export default Header;
