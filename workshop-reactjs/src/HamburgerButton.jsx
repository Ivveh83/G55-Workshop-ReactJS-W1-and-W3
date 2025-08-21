const HamburgerButton = () => {
  return (
    <button
      className="btn btn-outline-primary d-md-none mb-3"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#mobileSidebar"
      aria-controls="mobileSidebar"
    >
      <i className="bi bi-list"></i>
    </button>
  );
}
export default HamburgerButton;