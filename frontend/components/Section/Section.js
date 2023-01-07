import React from 'react';
import styled from '@emotion/styled';
import COLORS from '../../helper/COLORS';

/**
 * Style component based on a div element
 */
const StyledPage = styled.div`
  ${props =>
    `
      background-color:${props.bgColor};
      grid-template-rows:${props.templateRows};
      border-radius:${props.borderRadius};
      height:${props.height};
      margin:${props.margin};
      width:${props.width};
  `}
  display: grid;
`;

const Section = ({
  bgColor = COLORS.MONO[0],
  templateRows = 'auto 1fr auto',
  borderRadius = '0',
  height = '100vh',
  margin = '0',
  width = 'auto',
  children
}) => {
  return (
    <StyledPage
      data-testid={'section-1'}
      templateRows={templateRows}
      height={height}
      borderRadius={borderRadius}
      bgColor={bgColor}
      margin={margin}
      width={width}
    >
      {children}
    </StyledPage>
  );
};

export default Section;
