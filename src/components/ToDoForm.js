import { useState } from "react";
import { Button, Input, Space, Col } from "antd";

function ToDoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  function handleAddTask(e) {
    e.preventDefault();
    if (task.trim() === "") {
      setEmptyField(true);
      return;
    }
    setEmptyField(false);
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    addTask(newTask);
    setTask("");
  }

  return (
    <Col>
      <div className="ToDoForm">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            value={task}
            placeholder="Enter your task"
            onChange={(e) => {
              setTask(e.target.value);
              setEmptyField(false);
            }}
            style={{
              borderColor: emptyField ? "red" : undefined,
              transition: "border-color 0.3s ease",
            }}
          />
          <Button type="primary" onClick={handleAddTask} className="addTask">
            Submit
          </Button>
        </Space.Compact>
        <span
          className={`error-message ${emptyField ? "visible" : ""}`}
          style={{ fontSize: "large" }}
        >
          Empty Field
        </span>
      </div>
    </Col>
  );
}

export default ToDoForm;
