import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Button, ConfigProvider, Checkbox, Typography, Col } from "antd";
import { createStyles } from "antd-style";

const { Paragraph } = Typography;

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
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewText(task.text); // Сбросить текст задачи к исходному
    setIsEditing(false); // Завершить редактирование
  };

  const handleCheckboxChange = () => {
    const newCompletedStatus = !task.completed;
    statusTask(task.id, newCompletedStatus);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Col>
        <div
          className="ToDoItem"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px",
            justifyContent: "space-between",
          }}
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <Button
                onClick={handleEdit}
                type="primary"
                size="default"
                style={{ marginRight: "5px" }}
                icon={<SaveOutlined />}
              >
                Save
              </Button>
              <Button
                onClick={handleCancelEdit}
                type="primary"
                size="default"
                style={{ marginRight: "5px" }}
                icon={<CloseCircleFilled />}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={handleCheckboxChange}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  marginRight: "10px",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Paragraph
                  ellipsis={!expanded ? { rows: 1, symbol: "more" } : false}
                  style={{
                    maxWidth: expanded ? "100%" : "250px",
                    margin: 0,
                    whiteSpace: expanded ? "normal" : "nowrap",
                    overflow: expanded ? "visible" : "hidden",
                    textOverflow: expanded ? "clip" : "ellipsis",
                  }}
                >
                  {task.text}
                </Paragraph>
                {task.text.length > 25 && (
                  <a onClick={toggleExpand} style={{ marginLeft: "10px" }}>
                    {expanded ? "Collapse" : "more"}
                  </a>
                )}
              </span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() => setIsEditing(true)}
                  type="primary"
                  size="default"
                  style={{ marginRight: "5px" }}
                  icon={<EditOutlined />}
                />
                <Button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  type="primary"
                  size="default"
                  icon={<DeleteOutlined />}
                />
              </div>
            </div>
          )}
        </div>
      </Col>
    </ConfigProvider>
  );
}

export default ToDoItem;
