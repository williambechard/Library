import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Text from "../../components/Text/Text";
import Colors from "../../components/colors";

describe("Text Component Tests", () => {
  it("should render a default Text component", () => {
    render(<Text />);
    const textComponent = screen.getByTestId("text-1");
    expect(textComponent).toBeInTheDocument();
    expect(textComponent).toHaveTextContent("test");
    expect(textComponent).toHaveStyle(
      "display: inline-block",
      "font-size: 1rem",
      `@media screen and (min-width: 300px) {
        font-size: 1.5rem;
      }`,
      `@media screen and (min-width: 800px) {
      font-size: 2rem;
      }`,
      "font-weight: bold",
      "font-family: Poppins, serif",
      `background-color:${Colors.Mono[0]}`,
      `color:${Colors.Mono[Colors.Mono.length - 1]}`,
      "font-weight:400",
      "margin:0",
      "overflow:hidden",
      "maxHeight:40vh"
    );
  });

  it("should render a uniquely styled Text component", () => {
    render(
      <Text
        content={"test Content"}
        fontWeight={"200"}
        bgColor={Colors.Mono[1]}
        fColor={Colors.Mono[0]}
        margin={"10"}
        overflow={"auto"}
        maxHeight={"20vh"}
      />
    );
    const textComponent = screen.getByText("test Content");
    expect(textComponent).toBeInTheDocument();
    expect(textComponent).toHaveStyle(
      "font-weight: 200",
      `background-color:${Colors.Mono[1]}`,
      `color:${Colors.Mono[0]}`,
      "margin:10",
      "overflow:auto",
      "maxHeight:20vh"
    );
  });
});
