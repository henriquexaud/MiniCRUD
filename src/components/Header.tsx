type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header
    className="d-flex align-items-center bg-dark text-white px-3"
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 80,
        width: "100%",
        zIndex: 1050,
    }}
    >
      <button className="btn btn-outline-light me-3" onClick={toggleSidebar}>
        ☰
      </button>
      <h4 className="m-0">MiniCRUD</h4>
    </header>
  );
}
