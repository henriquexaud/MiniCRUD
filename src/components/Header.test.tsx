import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("should render the title", () => {
    render(<Header toggleSidebar={jest.fn()} />);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "MiniCRUD"
    );
  });

  it("should render the toggle button with correct data-cy", () => {
    render(<Header toggleSidebar={jest.fn()} />);
    const btn = screen.getByRole("button", { name: "☰" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-cy", "toggle-sidebar");
  });

  it("should call toggleSidebar when button is clicked", () => {
    const toggleMock = jest.fn();
    render(<Header toggleSidebar={toggleMock} />);
    const btn = screen.getByRole("button", { name: "☰" });
    fireEvent.click(btn);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
