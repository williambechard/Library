import styled from "@emotion/styled";

const StyledFlex = styled.div`
  display: flex;
  width: 100%;
  ${({ direction }) => `flex-direction: ${direction};`}
`;

const Flex = ({ children, direction = "row", ...props }) => {
  return <StyledFlex {...props}>{children}</StyledFlex>;
};

export default Flex;
