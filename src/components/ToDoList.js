import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, deleteTask, editTask, statusTask }) {
  return (
    <div className="ToDoList" style={{ marginTop: '10px'}}>
        {tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            statusTask={statusTask}
          />
        ))}
    </div>
  );
}

export default ToDoList;
