import React from 'react';
import styled from '@emotion/styled';
import COLORS from '../../helper/COLORS';

/**
 * Style component based on a div element
 */
const TextItem = styled.div`
  ${props => `
  display: ${props.display};
  font-size: ${props.fontSize / 1.5}rem;
  background-color: ${props.bgColor};
  color: ${props.fColor};
  font-weight: ${props.fontWeight};
  margin:${props.margin};
  overflow: ${props.overflow};
  max-height: ${props.maxHeight}; 
  @media screen and (min-width: 300px) {
    font-size: ${props.fontSize / 1.25}rem;
  }
  @media screen and (min-width: 800px) {
    font-size: ${props.fontSize}rem;
  }
  `}
  ${props =>
    props.clickable &&
    `
    text-decoration:underline dotted;
    cursor: pointer;
     &:hover {
        text-decoration:underline;
        color:${COLORS.BRIGHT[2]};
        text-weight:bold
      }
  `}
  text-align: left;
  font-family: Poppins, serif;
`;
const Text = ({
  display = 'inline-block',
  content = 'test',
  fontSize = '1',
  bgColor = COLORS.MONO[0],
  fColor = COLORS.MONO[COLORS.MONO.length - 1],
  fontWeight = '400',
  margin = '0',
  overflow = 'hidden',
  maxHeight = '40vh',
  clickable = false,
  onClick
}) => {
  return (
    <TextItem
      aria-label={content}
      display={display}
      fontSize={fontSize}
      bgColor={bgColor}
      fColor={fColor}
      fontWeight={fontWeight}
      margin={margin}
      overflow={overflow}
      maxHeight={maxHeight}
      clickable={clickable}
      onClick={onClick}
    >
      {content}
    </TextItem>
  );
};

export default Text;
