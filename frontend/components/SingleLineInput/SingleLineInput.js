import React from 'react';
import styled from '@emotion/styled';
import Text from '../Text/Text';
import COLORS from '../../helper/COLORS';
import { stringifyForDisplay } from '@apollo/client/utilities';

/**
 * Style component based on the input element
 */
const StyledInput = styled.input`
  ${props => `
  color: ${COLORS.MONO[COLORS.MONO.length - 1]};
  font-size: 1rem;
  height: 2rem;
  border-radius: 6px;
  border: 1px solid ${COLORS.MONO[4]};
  padding-left: 0.5rem;
  width: ${props.width};
  box-sizing: border-box;
`};
`;

const StyledAlert = styled.span`
  color: ${COLORS.BRIGHT[1]};
  font-family: Poppins;
`;

/**
 * Style component based on a div element
 * Styling for label part of the input
 */
const StyledDiv = styled.div`
  margin-bottom: 20px;
`;

const SingleLineInput = ({
  labelText = 'Label',
  errors,
  register,
  width = '100%'
}) => {
  return (
    <StyledDiv data-testid={'div-1'}>
      <label htmlFor={labelText}>
        <Text
          content={labelText}
          fontWeight={'1000'}
          fontSize={'1'}
          fColor={
            errors?.[labelText]
              ? COLORS.BRIGHT[1]
              : COLORS.MONO[COLORS.MONO.length - 1]
          }
        />
      </label>
      <StyledInput
        type={'text'}
        name={labelText}
        title={labelText}
        id={labelText}
        width={width}
        aria-invalid={errors?.[labelText] ? 'true' : 'false'}
        {...register(labelText, {
          required: 'Required',
          minLength: 1,
          maxLength: 110
        })}
      />
      {errors?.[labelText] && errors?.[labelText].type === 'required' && (
        <StyledAlert role={'alert'}>Input is Required</StyledAlert>
      )}
      {errors?.[labelText] && errors?.[labelText].type === 'maxLength' && (
        <StyledAlert role={'alert'}>Max length exceeded</StyledAlert>
      )}
    </StyledDiv>
  );
};

export default SingleLineInput;
