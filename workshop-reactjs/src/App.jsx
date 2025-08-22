import { useState } from "react";
import "./App.css";
import HamburgerButton from "./HamburgerButton.jsx";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import EditForm from "./EditForm.jsx";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    createdAt: "",
    assignedTo: "",
    attachments: [],
    taskDone: false,
  });
  const [attachmentList, setAttachmentList] = useState([]);

  return (
    <>
      <HamburgerButton />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main className="col-md-10 ms-sm-auto px-md-4 py-4">
            <Topbar tasks={tasks} setTasks={setFilteredTasks} />
            {updateMode ? (
              <EditForm
                task={taskUpdate}
                setTask={setTaskUpdate}
                tasks={tasks}
                setTasks={setTasks}
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
                setUpdateMode={setUpdateMode}
                attachmentList={attachmentList}
                setAttachmentList={setAttachmentList}
              />
            ) : (
              <TaskForm
                tasks={tasks}
                setTasks={setTasks}
                setFilteredTasks={setFilteredTasks}
                attachmentList={attachmentList}
                setAttachmentList={setAttachmentList}
              />
            )}

            <TaskList
              setTaskUpdate={setTaskUpdate}
              tasks={tasks}
              setTasks={setTasks}
              filteredTasks={filteredTasks}
              setFilteredTasks={setFilteredTasks}
              setUpdateMode={setUpdateMode}
              setAttachmentList={setAttachmentList}
              attachmentList={attachmentList}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
