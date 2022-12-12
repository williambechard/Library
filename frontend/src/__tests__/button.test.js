import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../components/";
import Colors from "../../components/colors";
import React from "react";

describe("Button  Component Tests", () => {
  it("should render a default Button component", () => {
    render(<Button />);
    const buttonComponent = screen.getByLabelText("Test");
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveStyle(
      "fontWeight:400",
      "fontSize:1",
      `background-color:${Colors.Mono[0]}`,
      `color:${Colors.Mono[Colors.Mono.length - 1]}`,
      `border-color:${Colors.Mono[Colors.Mono.length - 1]}`,
      "margin:unset"
    );
  });
  it("should render a Button with a custom label", () => {
    render(<Button label={"button"} />);
    const buttonComponent = screen.getByText("button");
    expect(buttonComponent).toBeInTheDocument();
  });
  it("should render a Button with a non-default style", () => {
    render(
      <Button
        fontWeight={"900"}
        fontSize={"2"}
        bgColor={Colors.Mono[1]}
        fColor={Colors.Mono[2]}
        borderColor={Colors.Mono[1]}
        margin={"1px"}
      />
    );
    const buttonComponent = screen.getByTestId("button-1");
    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveStyle(
      "fontWeight:900",
      "fontSize:2",
      `background-color:${Colors.Mono[1]}`,
      `color:${Colors.Mono[2]}`,
      `border-color:${Colors.Mono[1]}`,
      "margin:1px"
    );
  });
  it("should respond to a user click event", async () => {
    const mockCallBack = jest.fn();

    render(<Button onClick={mockCallBack} />);

    const buttonComponent = screen.getByTestId("button-1");
    expect(buttonComponent).toBeInTheDocument();
    await userEvent.click(buttonComponent);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
