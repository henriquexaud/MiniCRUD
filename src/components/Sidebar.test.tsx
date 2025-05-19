import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

// mock for useMediaQuery hook
jest.mock("react-responsive", () => ({ useMediaQuery: jest.fn() }));
import { useMediaQuery } from "react-responsive";

describe("Sidebar component", () => {
  const renderSidebar = (
    isOpen: boolean,
    isMd: boolean,
    initialEntries = ["/"]
  ) => {
    (useMediaQuery as jest.Mock).mockReturnValue(isMd);
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Sidebar isOpen={isOpen} />
      </MemoryRouter>
    );
  };

  it('always renders the aside with data-cy="sidebar"', () => {
    const { container } = renderSidebar(false, true);
    const aside = container.querySelector('[data-cy="sidebar"]');
    expect(aside).toBeInTheDocument();
  });

  it("hides links and has width 0px when closed", () => {
    const { container } = renderSidebar(false, true);
    const aside = container.querySelector('[data-cy="sidebar"]');
    expect(aside).toHaveStyle("width: 0px");
    expect(screen.queryByText("Cadastro")).toBeNull();
    expect(screen.queryByText("Usuários")).toBeNull();
  });

  it("opens with width 180px on medium and larger screens", () => {
    const { container } = renderSidebar(true, true);
    const aside = container.querySelector('[data-cy="sidebar"]');
    expect(aside).toHaveStyle("width: 180px");
  });

  it("renders NavLinks with correct hrefs", () => {
    renderSidebar(true, true);
    const cadastro = screen.getByText("Cadastro") as HTMLAnchorElement;
    const usuarios = screen.getByText("Usuários") as HTMLAnchorElement;
    expect(cadastro.getAttribute("href")).toBe("/");
    expect(usuarios.getAttribute("href")).toBe("/list");
  });

  it("marks the active link based on the current route", () => {
    renderSidebar(true, true, ["/list"]);
    const cadastro = screen.getByText("Cadastro");
    const usuarios = screen.getByText("Usuários");
    expect(cadastro).not.toHaveClass("active");
    expect(usuarios).toHaveClass("active");
  });
});
