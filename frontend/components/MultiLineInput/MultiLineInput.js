import React from 'react';
import styled from '@emotion/styled';
import Text from '../Text/Text';
import COLORS from '../../helper/COLORS';

/**
 * Style component based on a textarea
 */
const StyledInput = styled.textarea`
  width: inherit;
  resize: ${props => props.resize};
  font-size: 1rem;
  border-radius: 6px;
  color: ${COLORS.MONO[COLORS.MONO.length - 1]};
  border: 1px solid ${COLORS.MONO[4]};
  padding-left: 0.5rem;
  box-sizing: border-box;
`;

const StyledAlert = styled.span`
  color: ${COLORS.BRIGHT[1]};
  font-family: Poppins;
`;

/**
 * Style component based on a label element
 * Styling used for the label part of the input element
 */
const StyledLabel = styled.label`
  width: inherit;
`;

const MultiLineInput = ({
  register,
  labelText = 'Label',
  errors,
  rows,
  resize = 'none'
}) => {
  return (
    <StyledLabel>
      <label htmlFor={labelText}>
        <Text
          content={labelText}
          fontSize={1}
          fontWeight={'1000'}
          fColor={
            errors?.[labelText]
              ? COLORS.BRIGHT[1]
              : COLORS.MONO[COLORS.MONO.length - 1]
          }
        />
      </label>
      <StyledInput
        type={'text'}
        aria-label={labelText}
        id={labelText}
        title={labelText}
        rows={rows}
        resize={resize}
        name={labelText}
        aria-invalid={errors?.[labelText] ? 'true' : 'false'}
        {...register(labelText, {
          required: 'Required',
          minLength: 1,
          maxLength: 800
        })}
      />
      {errors?.[labelText] && errors?.[labelText].type === 'required' && (
        <StyledAlert role={'alert'}>Input is Required</StyledAlert>
      )}
      {errors?.[labelText] && errors?.[labelText].type === 'maxLength' && (
        <StyledAlert role={'alert'}>Max length exceeded</StyledAlert>
      )}
    </StyledLabel>
  );
};

export default MultiLineInput;
