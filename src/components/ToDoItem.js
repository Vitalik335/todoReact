import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Checkbox, Typography, Row, Col } from "antd";
import { createStyles } from "antd-style";

const { Text } = Typography; // Destructure Text from Typography

function ToDoItem({ task, deleteTask, editTask, statusTask }) {
  const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(
          .${prefixCls}-btn-dangerous
        ) {
        border-width: 0;

        > span {
          position: relative;
        }

        &::before {
          content: "";
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }

        &:hover::before {
          opacity: 0;
        }
      }
    `,
  }));

  const { styles } = useStyle();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    const newCompletedStatus = !task.completed;
    statusTask(task.id, newCompletedStatus);
  };

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Row justify="center" align="middle">
        <Col>
          <div className="ToDoItem">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
                <button onClick={handleEdit}>Save</button>
              </div>
            ) : (
              <div className={task.completed ? "completed" : "uncompleted"}>
                <Checkbox
                  type="checkbox"
                  checked={task.completed}
                  onChange={handleCheckboxChange}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <Text
                    strong
                    style={{
                      display: "inline-block",
                      width: "50px",
                      textAlign: "center",
                    }}
                  >
                    {task.text}
                  </Text>
                </span>
                <Button
                  onClick={() => setIsEditing(true)}
                  type="primary"
                  size="default"
                  style={{ marginRight: "5px" }}
                  icon={<EditOutlined />}
                >
                  edit
                </Button>
                <Button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  style={{ marginLeft: "5px" }}
                  type="primary"
                  size="default"
                  icon={<DeleteOutlined />}
                >
                  delete
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </ConfigProvider>
  );
}

export default ToDoItem;
