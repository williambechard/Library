import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Section from '../../../components/Section/Section';
import Colors from '../../../components/colors';

describe('Section Component Tests', () => {
  it('should render a default Section component', () => {
    render(<Section />);
    const sectionComponent = screen.getByTestId('section-1');
    expect(sectionComponent).toBeInTheDocument();
    expect(sectionComponent).toHaveStyle(
      `background-color : ${Colors.Mono[0]}`,
      'templateRows :auto 1fr auto',
      'borderRadius : 0',
      'height :100vh',
      'margin :0',
      'width :auto'
    );
  });
  it('should render a Section component with specified unique style', () => {
    render(
      <Section
        bgColor={Colors.Mono[1]}
        templateRos={'1fr 1fr 1fr'}
        borderRadius={'10px'}
        margin={'10'}
        width={'50px'}
        height={'50px'}
      />
    );
    const sectionComponent = screen.getByTestId('section-1');
    expect(sectionComponent).toBeInTheDocument();
    expect(sectionComponent).toHaveStyle(
      `background-color : ${Colors.Mono[1]}`,
      'templateRows :auto 1fr auto',
      'borderRadius : 10px',
      'height :50px',
      'margin :10',
      'width :50px'
    );
  });
});
