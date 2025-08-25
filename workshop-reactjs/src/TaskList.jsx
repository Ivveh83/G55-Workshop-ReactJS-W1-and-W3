import { sortTasks, filterTasks } from "./taskService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TaskListHeader = ({ setFilteredTasks, filteredTasks, tasks }) => {
  //const [fromDate, setFromDate] = useState("");
  //const [toDate, setToDate] = useState("");
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { from: "", to: "" } });
  const from = watch("from");
  const to = watch("to");
  useEffect(() => {
    trigger(["from", "to"]);
  }, [from, to, trigger]);
  

  const onSubmit = (data) => {
    setFilteredTasks(
      filterTasks(tasks, filteredTasks, "betweenDueDates", data.from, data.to)
    );
    clearErrors(["from", "to"]);
    setSubmenuOpen(false);
  };

  return (
    <>
      <div className="card-header bg-white d-flex justify-content-between align-items-center px-3">
        <h5 className="mb-0">Todos</h5>
        <div className="btn-group">
          {/* Filtering buttons*/}
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
                onClick={() =>
                  setFilteredTasks(filterTasks(tasks, filteredTasks, "done"))
                }
              >
                <i className="bi bi-check-square-fill me-2"></i>
                Show Done Tasks
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(filterTasks(tasks, filteredTasks, "notDone"))
                }
              >
                <i className="bi bi-check-square me-2"></i>
                Show Not Done Tasks
              </button>
            </li>

            {/* Hover submenu for filtering by due date */}
            <li className={`dropdown-submenu ${submenuOpen ? "show" : ""}`}>
              <button
                className="dropdown-item d-flex justify-content-between align-items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setSubmenuOpen(!submenuOpen);
                }}
              >
                <span>
                  <i className="bi bi-calendar-range me-2"></i>
                  Filter by Due Date
                </span>
                <i className="bi bi-chevron-right"></i>
              </button>

              {submenuOpen && (
                <ul
                  className="dropdown-menu p-3 shadow position-absolute top-0 start-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <button
                      className="btn-close border position-absolute top-0 end-0 m-1 p-2"
                      onClick={() => setSubmenuOpen(false)}
                    ></button>
                  </div>
                  <div className="mt-3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                      <label className="form-label">From</label>
                      <small className="text-danger">
                        {errors.from && errors.from.message}&nbsp;
                      </small>
                      <input
                        type="date"
                        className="form-control"
                        {...register("from", {
                          required: " is required",
                          validate: (value) => {
                            return (
                              !to ||
                              new Date(value) <= new Date(to) ||
                              " must be before 'To' date"
                            );
                          },
                        })}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">To</label>
                      <small className="text-danger">
                        {errors.to && errors.to.message}&nbsp;
                      </small>
                      <input
                        type="date"
                        className="form-control"
                        {...register("to", {
                          required: " is required",
                          validate: (value) => {
                            return (
                              !from ||
                              new Date(value) >= new Date(from) ||
                              " must be after 'From' date"
                            );
                          },
                        })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary w-100"
                    >
                      Apply
                    </button>
                  </form>
                  </div>
                </ul>
              )}
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setFilteredTasks(filterTasks(tasks, "all"));
                  //setFromDate("");
                  //setToDate("");
                  reset({ from: "", to: "" });
                  setSubmenuOpen(false);
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset Filter
              </button>
            </li>
          </ul>

          {/* Sorting buttons*/}
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
                onClick={() =>
                  setFilteredTasks(sortTasks(tasks, filteredTasks, "titleA-Z"))
                }
              >
                <i className="bi bi-sort-alpha-down me-2"></i>
                Sort by Title (A-Z)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(sortTasks(tasks, filteredTasks, "titleZ-A"))
                }
              >
                <i className="bi bi-sort-alpha-up me-2"></i>
                Sort by Title (Z-A)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(
                    sortTasks(tasks, filteredTasks, "dueDateAscending")
                  )
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
                  setFilteredTasks(
                    sortTasks(tasks, filteredTasks, "dueDateDescending")
                  )
                }
              >
                <i className="bi bi-calendar2-day me-2"></i>
                Sort by Due Date (Hi-Lo)
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(sortTasks(tasks, filteredTasks, "createdAt"))
                }
              >
                <i className="bi bi-clock me-2"></i>
                Sort by Created At
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  setFilteredTasks(
                    sortTasks(tasks, filteredTasks, "taskNotDone")
                  )
                }
              >
                <i className="bi bi-check-square-fill me-2"></i>
                Sort by Status Done
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setFilteredTasks(sortTasks(tasks, filteredTasks, "taskDone"));
                  console.log(filteredTasks);
                }}
              >
                <i className="bi bi-check-square me-2"></i>
                Sort by Status Not Done
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {setFilteredTasks(sortTasks(tasks, "reset"));
                  reset({ from: "", to: "" }); // Clear Filter by Due Date fields and errors as well
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset and Show All
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
        <TaskListHeader
          setFilteredTasks={setFilteredTasks}
          tasks={tasks}
          filteredTasks={filteredTasks}
        />

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
            <p className="text-muted">No tasks available.</p>
          </div>
        )}
      </div>
    </>
  );
};
export default TaskList;
