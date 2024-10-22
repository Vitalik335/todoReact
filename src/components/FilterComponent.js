import { Select, Space, Col } from "antd";

function FilterComponent({ filterTasks }) {
  return (
    <Col>
      <Space.Compact style={{ display:'flex', justifyContent:'end', marginTop: '10px' }}>
        <div className="ToDoForm">
          <Space wrap>
            <Select
              defaultValue="All"
              style={{ width: 160 }}
              onChange={(value) => {
                filterTasks(value);
              }}
              options={[
                { value: "all", label: "All" },
                { value: "completed", label: "Completed" },
                { value: "uncompleted", label: "Uncompleted" },
              ]}
            />
          </Space>
        </div>
      </Space.Compact>
    </Col>
  );
}

export default FilterComponent;
