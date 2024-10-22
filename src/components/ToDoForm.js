import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Row, Col } from "antd";

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
    <Row>
      <Col>
        <div className="ToDoForm">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              defaultValue="Combine input and button"
              value={task}
              placeholder="Enter your task"
              onChange={(e) => {
                setTask(e.target.value);
                setEmptyField(false);
              }}
            />
            <Button type="primary" onClick={handleAddTask} className="addTask">
              Submit
            </Button>
          </Space.Compact>
          {emptyField && <div style={{ color: "red" }}>Empty Field</div>}
        </div>
      </Col>
    </Row>
  );
}

export default ToDoForm;
