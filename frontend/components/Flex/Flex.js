import styled from "@emotion/styled";

/**
 * Style component based on a div element
 */
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

const Flex = ({ children, ...props }) => {
  return (
    <StyledFlex data-testid={"flex-1"} {...props}>
      {children}
    </StyledFlex>
  );
};

export default Flex;
