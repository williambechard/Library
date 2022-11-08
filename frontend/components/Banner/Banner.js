import React from "react";
import styled from "@emotion/styled";
import Flex from "../Flex";
import Colors from "../colors";

/**
 * Styling for container as a Flex component
 * Ensures items are spaced uniformly in a batter component
 */
const BannerFlex = styled(Flex)`
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "nowrap")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-content: ${(props) =>
    props.alignContent ? props.alignContent : "center"};
  height: ${(props) => (props.height ? props.height : "100px;")};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : Colors.Mono[0]};
  color: ${(props) => (props.fColor ? props.fColor : Colors.Mono[0])};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0px"};
  ${(props) =>
    props.footer === true &&
    `
    position: fixed;
    bottom: 0;
  `}
  ${(props) =>
    props.position === "fixed" &&
    `
    position: fixed;
    top: ${props.top};
    left: ${props.left};
    z-Index: ${props.zIndex};
  `}
`;

const Banner = ({ ...props }) => {
  return (
    <BannerFlex data-testid={"banner-1"} {...props}>
      {props.children}
    </BannerFlex>
  );
};

export default Banner;
