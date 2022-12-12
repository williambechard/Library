import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SingleLineInput, MultiLineInput } from "../../components";
import Colors from "../../components/colors";

describe("Single and MultiLine Text Input Component Tests", () => {
  describe("Single Line Text Input Component Tests", () => {
    it("should render a default Single Line Input component", () => {
      render(<SingleLineInput register={jest.fn()} errors={jest.fn()} />);

      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
      expect(screen.getByText("Label")).toBeInTheDocument();
      expect(textInputComponent).toHaveStyle(
        `color:${Colors.Mono[Colors.Mono.length - 1]}`,
        "font-size: 1rem",
        "height: 2rem",
        "border-radius: 6px",
        `border: 1px solid ${Colors.Mono[4]}`,
        "padding-left: 0.5rem",
        "box-sizing: border-box",
        "width:100%"
      );
      expect(screen.getByTestId("div-1")).toHaveStyle("margin-bottom:20px");
      expect(screen.getByText("Label")).toHaveStyle(
        `color:${Colors.Mono[Colors.Mono.length - 1]}`
      );
    });
    it("should render with a unique style", () => {
      render(
        <SingleLineInput
          register={jest.fn()}
          errors={jest.fn()}
          width={"50%"}
        />
      );
      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
      expect(textInputComponent).toHaveStyle("width:50%");
    });
    it("should have a label that correctly points to its input", () => {
      render(<SingleLineInput register={jest.fn()} errors={jest.fn()} />);
      const InputNode = screen.getByLabelText("Label");
      expect(InputNode.getAttribute("name")).toBe("Label");
    });
    it("should render with a specific style on required type error", () => {
      const mockError = () => {
        return {
          TestInput: {
            type: "required",
          },
        };
      };

      render(
        <SingleLineInput
          labelText={"TestInput"}
          register={jest.fn()}
          errors={mockError()}
        />
      );

      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
      expect(screen.getByText("TestInput")).toHaveStyle(
        `color:${Colors.Bright[1]}`
      );
      expect(screen.getByText("Input is Required")).toBeInTheDocument();
      expect(screen.getByText("Input is Required")).toHaveStyle(
        `color:${Colors.Bright[1]}`
      );
    });
    it("should render with a specific style on maxLength type error", () => {
      const mockError = () => {
        return {
          TestInput: {
            type: "maxLength",
          },
        };
      };

      render(
        <SingleLineInput
          labelText={"TestInput"}
          register={jest.fn()}
          errors={mockError()}
        />
      );

      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
      expect(screen.getByText("TestInput")).toHaveStyle(
        `color:${Colors.Bright[1]}`
      );
      expect(screen.getByText("Max length exceeded")).toBeInTheDocument();
      expect(screen.getByText("Max length exceeded")).toHaveStyle(
        `color:${Colors.Bright[1]}`
      );
    });
  });

  describe("Multi Line Text Input Component Tests", () => {
    it("should render a default Multi Line Input component", () => {
      render(<MultiLineInput register={jest.fn()} errors={jest.fn()} />);
      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
      expect(textInputComponent).toHaveStyle(
        "width: inherit",
        "resize: none",
        "font-size: 1rem",
        "border-radius: 6px",
        `color: ${Colors.Mono[Colors.Mono.length - 1]}`,
        `border: 1px solid ${Colors.Mono[4]}`,
        "padding-left: 0.5rem",
        "box-sizing: border-box"
      );
    });
    it("should render a unique styled w/ Label Multi Line Input component", () => {
      render(<MultiLineInput register={jest.fn()} errors={jest.fn()} />);

      const labelComponent = screen.getByText("Label");
      expect(labelComponent).toBeInTheDocument();
      expect(labelComponent).toHaveStyle(
        `color:${Colors.Mono[Colors.Mono.length - 1]}`
      );

      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
      expect(textInputComponent).toHaveStyle(
        "width: inherit",
        "resize: none",
        "font-size: 1rem",
        "border-radius: 6px",
        `color: ${Colors.Mono[Colors.Mono.length - 1]}`,
        `border: 1px solid ${Colors.Mono[4]}`,
        "padding-left: 0.5rem",
        "box-sizing: border-box"
      );
    });
    it("should have a label that correctly points to its input", () => {
      render(<MultiLineInput register={jest.fn()} errors={jest.fn()} />);

      const InputNode = screen.getByLabelText("Label");
      expect(InputNode.getAttribute("name")).toBe("Label");
    });
    it("should show style with required error", () => {
      const mockError = () => {
        return {
          Label: {
            type: "required",
          },
        };
      };

      render(<MultiLineInput register={jest.fn()} errors={mockError()} />);

      const labelComponent = screen.getByText("Label");
      expect(labelComponent).toBeInTheDocument();
      expect(labelComponent).toHaveStyle(`color:${Colors.Bright[1]}`);
      expect(screen.getByText("Input is Required")).toBeInTheDocument();
      expect(screen.getByText("Input is Required")).toHaveStyle(
        `color:${Colors.Bright[1]}`
      );
      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
    });
    it("should show style with maxLength error", () => {
      const mockError = () => {
        return {
          Label: {
            type: "maxLength",
          },
        };
      };

      render(<MultiLineInput register={jest.fn()} errors={mockError()} />);

      const labelComponent = screen.getByText("Label");
      expect(labelComponent).toBeInTheDocument();
      expect(labelComponent).toHaveStyle(`color:${Colors.Bright[1]}`);
      expect(screen.getByText("Max length exceeded")).toBeInTheDocument();
      expect(screen.getByText("Max length exceeded")).toHaveStyle(
        `color:${Colors.Bright[1]}`
      );
      const textInputComponent = screen.getByRole("textbox");
      expect(textInputComponent).toBeInTheDocument();
    });
  });
});
