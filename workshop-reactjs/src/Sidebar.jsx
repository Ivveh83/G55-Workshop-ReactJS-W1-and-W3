const SidebarContent = () => (
  <> 
    <div>
      <div className="d-flex align-items-center px-3 mb-4">
        <img
          src="assets/logo.png"
          alt="Logo"
          style={{
            height: "40px",
            width: "40px",
            objectFit: "contain",
          }}
        />
      </div>
      <ul className="nav flex-column text-start">
        <li className="nav-item my-2 d-flex align-items-center">
          <span
            className="me-3 d-flex justify-content-center"
            style={{ width: "1.5em" }}
          >
            <i className="bi bi-house-door-fill"></i>
          </span>
          Dashboard
        </li>
        <li className="nav-item my-2 d-flex align-items-center">
          <span
            className="me-3 d-flex justify-content-center"
            style={{ width: "1.5em" }}
          >
            <i className="bi bi-people-fill"></i>
          </span>
          Users
        </li>
        <li className="nav-item my-2 d-flex align-items-center">
          <span
            className="me-3 d-flex justify-content-center"
            style={{ width: "1.5em" }}
          >
            <i className="bi bi-card-checklist"></i>
          </span>
          Tasks
        </li>
        <li className="nav-item my-2 d-flex align-items-center">
          <span
            className="me-3 d-flex justify-content-center"
            style={{ width: "1.5em" }}
          >
            <i className="bi bi-gear-fill"></i>
          </span>
          Settings
        </li>
      </ul>
    </div>

    <div>
      <p className="mb-1">Username</p>
      <button className="btn btn-outline-danger btn-sm mb-5">
        <i className="bi bi-box-arrow-right me-1"></i>
        Log out
      </button>
    </div>
  </>
);

const Sidebar = () => {
  return (
    <>
{/* Offcanvas sidebar för mobil */}
          <nav
            className="offcanvas offcanvas-start d-md-none" // d-md-none hides it on larger screens than md
            tabIndex="-1"
            id="mobileSidebar"
            aria-labelledby="mobileSidebarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="mobileSidebarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <SidebarContent />
            </div>
          </nav>

          {/* Vanlig sidebar för desktop */}
          <nav className="col-12 col-md-2 d-none d-md-flex flex-column justify-content-between bg-light sidebar py-4 min-vh-100">
            <SidebarContent />
          </nav>
          </>
          );
}
export default Sidebar;