import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SingleLineInput, MultiLineInput } from '../../../components';
import { COLORS } from '../../../components';

describe('Single Line Text Input Component Tests', () => {
  it('should render a default Single Line Input component', () => {
    render(<SingleLineInput register={jest.fn()} errors={jest.fn()} />);

    const labelHTML = screen.getByText('Label');

    expect(labelHTML).toBeInTheDocument();
    expect(labelHTML).toHaveStyle(
      `color:${COLORS.MONO[COLORS.MONO.length - 1]}`
    );

    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
    expect(textInputComponent).toHaveStyle(
      `color:${COLORS.MONO[COLORS.MONO.length - 1]}`,
      'font-size: 1rem',
      'height: 2rem',
      'border-radius: 6px',
      `border: 1px solid ${COLORS.MONO[4]}`,
      'padding-left: 0.5rem',
      'box-sizing: border-box',
      'width:100%'
    );
  });
  it('should render with a unique style', () => {
    render(
      <SingleLineInput register={jest.fn()} errors={jest.fn()} width={'50%'} />
    );
    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
    expect(textInputComponent).toHaveStyle('width:50%');
  });
  it('should have a label that correctly points to its input', () => {
    render(<SingleLineInput register={jest.fn()} errors={jest.fn()} />);
    const div = screen.getByText('Label');
    expect(div).toBeInTheDocument();
    expect(div.closest('label').getAttribute('for')).toBe('Label');
    const InputNode = screen.getByRole('textbox');
    expect(InputNode.getAttribute('name')).toBe('Label');
  });
  it('should render with a specific style on required type error', () => {
    const mockError = () => {
      return {
        TestInput: {
          type: 'required'
        }
      };
    };

    render(
      <SingleLineInput
        labelText={'TestInput'}
        register={jest.fn()}
        errors={mockError()}
      />
    );

    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
    expect(screen.getByText('TestInput')).toHaveStyle(
      `color:${COLORS.BRIGHT[1]}`
    );
    const errorText = screen.getByText('Input is Required');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveStyle(`color:${COLORS.BRIGHT[1]}`);
  });
  it('should render with a specific style on maxLength type error', () => {
    const mockError = () => {
      return {
        TestInput: {
          type: 'maxLength'
        }
      };
    };

    render(
      <SingleLineInput
        labelText={'TestInput'}
        register={jest.fn()}
        errors={mockError()}
      />
    );

    const textInputComponent = screen.getByRole('textbox');
    expect(textInputComponent).toBeInTheDocument();
    expect(screen.getByText('TestInput')).toHaveStyle(
      `color:${COLORS.BRIGHT[1]}`
    );
    const errorText = screen.getByText('Max length exceeded');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveStyle(`color:${COLORS.BRIGHT[1]}`);
  });
});
