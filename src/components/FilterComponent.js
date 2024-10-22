import { Select, Space, Row, Col } from "antd";

function FilterComponent({ filterTasks }) {
  return (
    <div className="FilterComponent">
      <Row justify="end" style={{ marginTop: '10px' }}>
        <Col span={24}>
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
          <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Filter Tasks</span>
        </Col>
      </Row>
    </div>
  );
}

export default FilterComponent;
