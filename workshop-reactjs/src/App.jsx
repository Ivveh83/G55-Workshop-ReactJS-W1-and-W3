import { useState } from "react";
import "./App.css";
import HamburgerButton from "./HamburgerButton.jsx";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <HamburgerButton />

      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main className="col-md-10 ms-sm-auto px-md-4 py-4">
            <Topbar />

            <TaskForm />

            <TaskList />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
