import styled from "@emotion/styled";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 3rem 1rem;
  background: #dfdfdf;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  font-family: Poppins, "Times New Roman";
  font-size: xx-large;
  margin: 0;
  gap: 1rem;
`;

const Section = ({ children }) => {
  return (
    <StyledSection>
      <Container>{children}</Container>
    </StyledSection>
  );
};

export default Section;
