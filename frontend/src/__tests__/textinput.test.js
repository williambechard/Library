import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { SingleLineInput, MultiLineInput } from "../../components";

afterEach(cleanup);

describe("text input tests", () => {
  it("should render a Single Line Input component", () => {
    render(
      <SingleLineInput
        labelText={"Title"}
        register={jest.fn()}
        errors={jest.fn()}
        width={"100%"}
      />
    );
    const textInputComponent = screen.getByRole("textbox");
    expect(textInputComponent).toBeInTheDocument();
    expect(textInputComponent).toHaveStyle(
      "font-size: 1rem",
      "height: 2rem",
      "border-radius: 6px",
      "border: 1px solid grey",
      "padding-left: 0.5rem",
      "box-sizing: border-box"
    );
  });

  it("should render a Multi Line Input component", () => {
    render(
      <MultiLineInput
        labelText={"Title"}
        register={jest.fn()}
        errors={jest.fn()}
        width={"100%"}
      />
    );
    const textInputComponent = screen.getByRole("textbox");
    expect(textInputComponent).toBeInTheDocument();
    expect(textInputComponent).toHaveStyle(
      "font-size: 1rem",
      "height: 2rem",
      "border-radius: 6px",
      "border: 1px solid grey",
      "padding-left: 0.5rem",
      "box-sizing: border-box"
    );
  });
});
