import { sortTasks, filterTasks } from "./taskService";

const TaskListHeader = ({ setFilteredTasks, tasks }) => {
  return (
    <>
      <div className="card-header bg-white d-flex justify-content-between align-items-center px-3">
        <h5 className="mb-0">Todos</h5>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            title="Filter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-filter"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(filterTasks(tasks, "done"))}
              >
                <i className="bi bi-check-square-fill me-2"></i>
                Show Done Tasks
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(filterTasks(tasks, "notDone"))}
              >
                <i className="bi bi-check-square me-2"></i>
                Show Not Done Tasks
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            title="Sort"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-sort-down"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(sortTasks(tasks, "titleA-Z"))}
              >
                <i className="bi bi-sort-alpha-down me-2"></i>
                Sort by Title (A-Z)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(sortTasks(tasks, "titleZ-A"))}
              >
                <i className="bi bi-sort-alpha-up me-2"></i>
                Sort by Title (Z-A)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(sortTasks(tasks, "dueDateAscending"))
                }
              >
                <i className="bi bi-calendar2-day me-2"></i>
                Sort by Due Date (Lo-Hi)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(sortTasks(tasks, "dueDateDescending"))
                }
              >
                <i className="bi bi-calendar2-day me-2"></i>
                Sort by Due Date (Hi-Lo)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(sortTasks(tasks, "createdAt"))}
              >
                <i className="bi bi-clock me-2"></i>
                Sort by Created At
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(sortTasks(tasks, "taskNotDone"))
                }
              >
                <i className="bi bi-check-square-fill me-2"></i>
                Sort by Status Done
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(sortTasks(tasks, "taskDone"))}
              >
                <i className="bi bi-check-square me-2"></i>
                Sort by Status Not Done
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setFilteredTasks(sortTasks(tasks, "reset"))}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reset Sort
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const TaskList = ({
  setTaskUpdate,
  tasks,
  setTasks,
  filteredTasks,
  setFilteredTasks,
  setUpdateMode,
  setAttachmentList,
}) => {
  return (
    <>
      <div className="card shadow-sm mx-5 mt-5">
        <TaskListHeader setFilteredTasks={setFilteredTasks} tasks={tasks} />

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className="card-body" id="todo-list" key={task.id}>
              <div className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{task.title}</h6>
                    <small className="text-muted">{task.description}</small>
                  </div>
                  <div className="d-flex justify-content-end">
                    <small className="text-muted mx-3">
                      {task.createdAt.slice(0, 10)}
                    </small>
                    <button
                      className={`btn btn-sm ${
                        task.taskDone ? "btn-success" : "btn-outline-success"
                      } me-1`}
                      title="Done"
                      onClick={() => {
                        const updatedTasks = tasks.map((t) =>
                          t.id === task.id ? { ...t, taskDone: !t.taskDone } : t
                        );
                        setTasks(updatedTasks);
                        setFilteredTasks(updatedTasks);
                        //console.log(updatedTasks.filter((t) => t.id === task.id)[0]);
                      }}
                    >
                      <i className="bi bi-check-lg"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      title="Edit"
                      onClick={() => {
                        setTaskUpdate(task);
                        setAttachmentList(Array.from(task.attachments) || []);
                        setUpdateMode(true);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                      onClick={() => {
                        // Handle delete action
                        setTasks(tasks.filter((t) => t.id !== task.id));
                        setFilteredTasks(
                          filteredTasks.filter((t) => t.id !== task.id)
                        );
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="mt-2 d-flex flex-wrap gap-2">
                  <span className="bg-white text-secondary">
                    <i className="bi bi-calendar2-day me-1"></i>
                    {task.dueDate}
                  </span>
                  <span className="badge bg-info">
                    <i className="bi bi-person-fill me-1"></i>{" "}
                    {task.assignedTo || "Unassigned"}
                  </span>
                  <span className="badge bg-secondary">
                    <i className="bi bi-paperclip me-1"></i>{" "}
                    {task.attachments ? task.attachments.length : 0}{" "}
                    attachment(s)
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card-body text-center">
            <p className="text-muted">No tasks available. Please add a task.</p>
          </div>
        )}
      </div>
    </>
  );
};
export default TaskList;
