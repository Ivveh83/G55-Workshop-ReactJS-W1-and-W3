import { searchTasks } from "./taskService";

const TaskListHeader = () => {
  return (
    <>
      <div className="card-header bg-white d-flex justify-content-between align-items-center px-3">
        <h5 className="mb-0">Todos</h5>
        <div className="btn-group">
          <button className="btn btn-outline-secondary btn-sm" title="Filter">
            <i className="bi bi-filter"></i>
          </button>
          <button className="btn btn-outline-secondary btn-sm" title="Sort">
            <i className="bi bi-sort-down"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const TaskList = ({ setTaskUpdate, tasks, setTasks, filteredTasks, setFilteredTasks, setUpdateMode}) => {
  return (
    <>
      <div className="card shadow-sm mx-5 mt-5">
        <TaskListHeader />

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
                    <small className="text-muted mx-3">{task.createdAt.slice(0, 10)}</small>
                    <button
                      className="btn btn-sm btn-outline-success me-1"
                      title="Done"
                    >
                      <i className="bi bi-check-lg"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      title="Edit"
                      onClick={() => {
                        setTaskUpdate(task);
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
                        setTasks(tasks.filter(t => t.id !== task.id));
                        setFilteredTasks(filteredTasks.filter(t => t.id !== task.id));
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
