import styled from "@emotion/styled";

const StyledFlex = styled.div`
  display: flex;
  ${(props) =>
    props.gap &&
    `
      gap:${props.gap};
  `}
  flex-wrap: ${(props) => (props.wrap ? props.wrap : "nowrap")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  align-content: ${(props) =>
    props.alignContent ? props.alignContent : "center"};
  @media screen and (max-width: 410px) {
    flex-direction: column;
  }
  ${({ direction }) => `flex-direction: ${direction};`}
`;

const Flex = ({
  children,
  direction = "row",
  height = "100%",
  width = "100%",
  margin = "0",
  padding = "0",
  ...props
}) => {
  return (
    <StyledFlex
      direction={direction}
      data-testid={"flex-1"}
      height={height}
      width={width}
      margin={margin}
      padding={padding}
      {...props}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;
