import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const isMd = useMediaQuery({ minWidth: 768 });

  return (
    <aside
      className="bg-light"
      style={{
        position: "fixed",
        top: 80,
        left: 0,
        width: isOpen ? (isMd ? 180 : 100) : 0,
        height: "calc(100vh - 80px)",
        overflowX: "hidden",
        transition: "width 0.3s",
        zIndex: 1040,
        borderRight: "1px solid #ddd",
        padding: isOpen ? "0.5rem" : 0,
      }}
    >
      {isOpen && (
        <nav className="d-flex flex-column gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `btn ${isMd ? "" : "btn-sm"} btn-outline-secondary text-start${
                isActive ? " active" : ""
              }`
            }
          >
            Cadastro
          </NavLink>

          <NavLink
            to="/crud"
            className={({ isActive }) =>
              `btn ${isMd ? "" : "btn-sm"} btn-outline-secondary text-start${
                isActive ? " active" : ""
              }`
            }
          >
            Usuários
          </NavLink>
        </nav>
      )}
    </aside>
  );
}
