import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { generateId } from "./idGenerator";

const TaskForm = ({
  tasks,
  setTasks,
  setFilteredTasks,
  update,
  attachmentList,
  setAttachmentList,
}) => {
  useEffect(() => {}, [update]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ title: "", description: "", dueDate: "" });

  const onSubmit = (data) => {
    data.id = generateId(tasks);
    data.createdAt = new Date().toLocaleString();
    data.taskDone = false;
    data.assignedTo =
      data.assignedTo === "-- Select Person (Optional) --"
        ? ""
        : data.assignedTo;
    const newTask = {
      ...data,
      attachments: attachmentList ? Array.from(attachmentList) : [],
    };
    setTasks([...tasks, newTask]);
    setFilteredTasks([...tasks, newTask]);
    console.log(newTask);
    // Reset form fields after submission
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("selectPerson").value = "";
    document.getElementById("attachments").value = "";
    setAttachmentList([]); // Clear the attachment list
  };

  return (
    <>
      {/* Task Form */}
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
                rows="3"
                placeholder="Task description"
                {...register("description", { required: " is required" })}
              ></textarea>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due date
                </label>
                <small className="text-danger">
                  {errors.dueDate && errors.dueDate.message}&nbsp;
                </small>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  {...register("dueDate", {
                    required: " is required",
                    validate: (value) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // nollställ tid
                      const selected = new Date(value);

                      return selected >= today || " cannot be in the past";
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
                  defaultValue=""
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
                onChange={(e) => {
                  setAttachmentList(Array.from(e.target.files));
                }}
              />
            </div>
            <div className="mt-3 border p-2">
              <ul id="attachmentList" className="list-group mt-5">
                {attachmentList.length > 0 &&
                  attachmentList.map((file, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setAttachmentList(attachmentList.filter((_, i) => i !== index));
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-1"></i>
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
