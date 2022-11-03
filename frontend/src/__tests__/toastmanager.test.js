import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ToastManager from "../../components/ToastManager/ToastManager";
import Toast from "../../components/Toast/Toast";
it("should render a Section component", () => {
  render(
    <ToastManager>
      <Toast />
    </ToastManager>
  );
});
