import ToDoForm from "./ToDoForm";
import FilterComponent from "./FilterComponent";
import ToDoList from "./ToDoList";
import { useState, useEffect } from "react";
import { Card, Row, Col, Empty  } from "antd";

function ToDoApp() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const filterTasks = (status) => {
    setFilter(status);
  };

  const statusTask = (id, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Card
          title={<h1>My To-Do App</h1>}
          bordered={false}
          style={{ width: 300 }}
        >
          <div className="ToDoApp">
            <ToDoForm addTask={addTask} />
            <FilterComponent filterTasks={filterTasks} />
            {filteredTasks.length === 0 ? (
              <Empty style={{ marginTop: '10px'}}/>
            ) : (
              <ToDoList 
                tasks={filteredTasks}
                deleteTask={deleteTask}
                editTask={editTask}
                statusTask={statusTask}
              />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default ToDoApp;
