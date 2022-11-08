import styled from "@emotion/styled";
import Colors from "../colors";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 3rem 2rem;
  background: ${(props) => (props.bgColor ? props.bgColor : Colors.Mono[1])};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0 0 0 0"};
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  gap: 1rem;
`;

const Section = ({ children, ...props }) => {
  return (
    <StyledSection data-testid={"section-1"} {...props}>
      <Container>{children}</Container>
    </StyledSection>
  );
};

export default Section;
