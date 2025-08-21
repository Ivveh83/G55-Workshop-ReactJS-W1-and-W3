const TaskForm = () => {
    return (
        <>
        {/* Task Form */}
            <div className="card mb-4 mx-5">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      placeholder="Task title"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      rows="3"
                      placeholder="Task description"
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="dueDate" className="form-label">
                        Due date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="dueDate"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="selectPerson" className="form-label">
                        Assign to Person (Optional)
                      </label>
                      <select
                        className="form-select"
                        id="selectPerson"
                        name="selectPerson"
                      >
                        <option selected disabled>
                          -- Select Person (Optional) --
                        </option>
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
                    />
                  </div>
                  <div className="mt-3 border p-2">
                    <ul id="attachmentList" className="list-group mt-5"></ul>
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
}

export default TaskForm;