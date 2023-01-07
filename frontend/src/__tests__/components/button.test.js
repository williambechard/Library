import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../../components';
import { COLORS } from '../../../components';
import React from 'react';

describe('Button  Component Tests', () => {
  it('should render a default Button component', () => {
    render(<Button />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveStyle(
      'fontWeight:400',
      'fontSize:1',
      `background-color:${COLORS.MONO[0]}`,
      `color:${COLORS.MONO[COLORS.MONO.length - 1]}`,
      `border-color:${COLORS.MONO[COLORS.MONO.length - 1]}`,
      'margin:unset'
    );
  });
  it('should render a Button with a custom label', () => {
    render(<Button label={'button'} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
  });
  it('should render a Button with a non-default style', () => {
    render(
      <Button
        fontWeight={'900'}
        fontSize={'2'}
        bgColor={COLORS.MONO[1]}
        fColor={COLORS.MONO[2]}
        borderColor={COLORS.MONO[1]}
        margin={'1px'}
      />
    );
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveStyle(
      'fontWeight:900',
      'fontSize:2',
      `background-color:${COLORS.MONO[1]}`,
      `color:${COLORS.MONO[2]}`,
      `border-color:${COLORS.MONO[1]}`,
      'margin:1px'
    );
  });
  it('should respond to a user click event', async () => {
    const mockCallBack = jest.fn();

    render(<Button onClick={mockCallBack} />);

    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeInTheDocument();
    await userEvent.click(buttonComponent);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
