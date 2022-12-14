import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/Text/Text';
import { COLORS } from '../../../components';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Text Component Tests', () => {
  it('should render a default Text component', () => {
    render(<Text />);
    const textComponent = screen.getByText('test');
    expect(textComponent).toBeInTheDocument();
    expect(textComponent).toHaveTextContent('test');
    expect(textComponent).toHaveStyle(
      'display: inline-block',
      'font-size: 1rem',
      `@media screen and (min-width: 300px) {
        font-size: 1.5rem;
      }`,
      `@media screen and (min-width: 800px) {
      font-size: 2rem;
      }`,
      'font-weight: bold',
      'font-family: Poppins, serif',
      `background-color:${COLORS.MONO[0]}`,
      `color:${COLORS.MONO[COLORS.MONO.length - 1]}`,
      'font-weight:400',
      'margin:0',
      'overflow:hidden',
      'maxHeight:40vh'
    );
  });
  it('should render a uniquely styled Text component', () => {
    render(
      <Text
        content={'test Content'}
        fontWeight={'200'}
        bgColor={COLORS.MONO[1]}
        fColor={COLORS.MONO[0]}
        margin={'10'}
        overflow={'auto'}
        maxHeight={'20vh'}
      />
    );
    const textComponent = screen.getByText('test Content');
    expect(textComponent).toBeInTheDocument();
    expect(textComponent).toHaveStyle(
      'font-weight: 200',
      `background-color:${COLORS.MONO[1]}`,
      `color:${COLORS.MONO[0]}`,
      'margin:10',
      'overflow:auto',
      'maxHeight:20vh'
    );
  });
  it('should respond to a user click event', async () => {
    const mockCallBack = jest.fn();

    render(
      <Text
        content={'test Content'}
        fontWeight={'200'}
        bgColor={COLORS.MONO[1]}
        fColor={COLORS.MONO[0]}
        margin={'10'}
        overflow={'auto'}
        maxHeight={'20vh'}
        onClick={mockCallBack}
      />
    );

    const textComponent = screen.getByText('test Content');
    expect(textComponent).toBeInTheDocument();
    await userEvent.click(textComponent);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
