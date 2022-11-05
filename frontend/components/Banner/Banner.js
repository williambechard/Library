import React from "react";
import styled from "@emotion/styled";
import Flex from "../Flex";

const BannerFlex = styled(Flex)`
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "nowrap")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-content: ${(props) =>
    props.alignContent ? props.alignContent : "center"};
  height: ${(props) => (props.height ? props.height : "100px;")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "grey")};
  color: ${(props) => (props.fColor ? props.fColor : "white")};
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

const BannerItem = styled.div`
  display: inline-block;
  margin: ${(props) => (props.margin ? props.margin : "auto 10px")};
`;

const Banner = ({
  height,
  bgColor = "white",
  fColor = "black",
  flexWrap = "nowrap",
  justifyContent = "flex-start",
  alignContent = "center",
  margin = "auto 20px",
  borderRadius = "0px",
  position,
  top,
  left,
  zIndex,
  footer = false,
  children,
}) => {
  return (
    <BannerFlex
      data-testid={"header-1"}
      height={height}
      bgColor={bgColor}
      fColor={fColor}
      flexWrap={flexWrap}
      justifyContent={justifyContent}
      alignContent={alignContent}
      borderRadius={borderRadius}
      footer={footer}
      position={position}
      top={top}
      left={left}
      zIndex={zIndex}
    >
      {React.Children.map(children, (component) => {
        return <BannerItem margin={margin}>{component}</BannerItem>;
      })}
    </BannerFlex>
  );
};

export default Banner;
