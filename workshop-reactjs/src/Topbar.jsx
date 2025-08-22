import { searchTasks } from "./taskService";

const Topbar = ({ tasks, setTasks }) => {
  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h2>Tasks</h2>
        <form style={{ maxWidth: "300px" }}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search tasks..."
              aria-label="Search"
              onChange={(e) => {
                const filtered = searchTasks(tasks, e.target.value);
                setTasks(filtered);
              }}
            />
            {/*<button className="btn btn-outline-secondary" type="submit">
                    <i className="bi bi-search"></i>
                  </button>*/}
          </div>
        </form>
      </div>

      <hr />
    </>
  );
};
export default Topbar;
