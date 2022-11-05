import styled from "@emotion/styled";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 3rem 2rem;
  background: ${(props) => (props.bgColor ? props.bgColor : "#DFDFDF")};
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

const Section = ({
  children,
  borderRadius = "0 0 0 0",
  bgColor = "#DFDFDF",
}) => {
  return (
    <StyledSection
      data-testid={"section-1"}
      bgColor={bgColor}
      borderRadius={borderRadius}
    >
      <Container>{children}</Container>
    </StyledSection>
  );
};

export default Section;
