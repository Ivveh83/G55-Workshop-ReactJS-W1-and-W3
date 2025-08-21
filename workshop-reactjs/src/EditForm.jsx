import { useForm } from "react-hook-form";

const EditForm = ({
  task,
  setTask,
  tasks,
  setTasks,
  filteredTasks,
  setFilteredTasks,
  setUpdateMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      assignedTo: task.assignedTo || "",
      attachments: task.attachments || [],
    },
  });

  const onSubmit = (data) => {
    data.id = task.id; // Keep the same ID for the task being updated
    data.createdAt = task.createdAt; // Keep the original creation date
    data.assignedTo =
      data.assignedTo === "-- Select Person (Optional) --"
        ? ""
        : data.assignedTo;
    const updatedTask = {
      ...data,
      attachments: data.attachments ? Array.from(data.attachments) : [],
    };
    setTask(updatedTask);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    setFilteredTasks(
      filteredTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
    console.log("Updated task: ", updatedTask);
    setUpdateMode(false); // Reset update state after submission
  };

  return (
    <div className="card mb-4 mx-5">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <small className="text-danger">
              {errors.title && errors.title.message}&nbsp;
            </small>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Task title"
              {...register("title", { required: " is required" })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <small className="text-danger">
              {errors.description && errors.description.message}&nbsp;
            </small>
            <textarea
              id="description"
              className="form-control"
              placeholder="Task description"
              rows={3}
              {...register("description", { required: " is required" })}
            ></textarea>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <small className="text-danger">
              {errors.dueDate && errors.dueDate.message}&nbsp;
            </small>
              <input
                type="date"
                id="dueDate"
                className="form-control"
                {...register("dueDate", {
                    required: " is required",
                    validate: (value) => {
                      const creationDay = new Date(task.createdAt);
                      creationDay.setHours(0, 0, 0, 0); // nollställ tid
                      const selected = new Date(value);

                      return selected >= creationDay || " cannot be earlier than creation date";
                    },
                  })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="selectPerson" className="form-label">
                Assign to Person (Optional)
              </label>
              <select
                className="form-select"
                id="selectPerson"
                {...register("assignedTo")}
              >
                <option value="">-- Select Person (Optional) --</option>
                <option>Person 1</option>
                <option>Person 2</option>
                <option>Person 3</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="attachments" className="form-label">
              Attachments
            </label>
            <input
              type="file"
              className="form-control"
              id="attachments"
              multiple
              {...register("attachments")}
            />
          </div>
          <div className="mt-3 border p-2">
            <ul id="attachmentList" className="list-group mt-5"></ul>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-success">
              <i className="bi bi-pencil me-1"></i>
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
