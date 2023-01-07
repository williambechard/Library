import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Flex from '../../../components/Flex/Flex';
import { COLORS } from '../../../components';

describe('Flex Component Tests', () => {
  it('should render a default Flex component', () => {
    render(<Flex />);
    const flexComponent = screen.getByTestId('flex-1');
    expect(flexComponent).toBeInTheDocument();
    expect(flexComponent).toHaveStyle(
      `background-color : ${COLORS.MONO[0]}`,
      'gap:unset',
      'flex-wrap:wrap',
      'margin:0',
      'width:100%',
      'height:100%',
      'padding:0',
      'justify-content:center',
      'align-content:center',
      'flex-direction:initial',
      'z-index:0',
      'transform:inherit',
      'border-radius:0'
    );
  });
  it('should render a Flex component with specified unique style', () => {
    render(
      <Flex
        bgColor={COLORS.MONO[1]}
        gap={'10px'}
        wrap={'nowrap'}
        margin={'10'}
        width={'50%'}
        height={'50%'}
        padding={'10'}
        justifyContent={'flex-start'}
        alignContent={'flex-start'}
        direction={'column'}
        zIndex={'1'}
        transform={'translateY(-10px)'}
        borderRadius={'15px'}
      />
    );
    const flexComponent = screen.getByTestId('flex-1');
    expect(flexComponent).toBeInTheDocument();
    expect(flexComponent).toHaveStyle(
      `background-color : ${COLORS.MONO[1]}`,
      'gap:10px',
      'flex-wrap:nowrap',
      'margin:10',
      'width:50%',
      'height:50%',
      'padding:10',
      'justify-content:flex-start',
      'align-content:flex-start',
      'flex-direction:column',
      'z-index:1',
      'transform:translateY(-10px)',
      'border-radius:15px'
    );
  });
});
