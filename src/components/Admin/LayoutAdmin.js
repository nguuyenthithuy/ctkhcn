import { Button, Col, Form, Input, Row, Select, theme } from "antd";
// import UserTable from "./UserTable";
// import { useEffect, useState } from "react";
// import { getDetail } from "../../services/getDetail";

const LayoutAdmin = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  // const fetchApi = async () => {
  //   const res = await getDetail();
  //   // console.log("check res", res);
  //   if (res && res.length > 0) {
  //     setData(res);
  //   }
  // };
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const onFinish = (values) => {
    let query = "";
    if (values.year) {
      query += `year=${values.year}`;
    }
    if (values.author) {
      query += `author=${values.author}`;
    }
    if (values.keyword) {
      query += `keyword=${values.keyword}`;
    }
    if (query) {
      props.handleSearch(query);
    }
  };

  // console.log("check author", author);
  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="Năm học" name="year" labelCol={{ span: 6 }}>
              <Input placeholder="Năm" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Tác giả" name="author" labelCol={{ span: 6 }}>
              <Input placeholder="Tác giả" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Từ khóa" name="keyword" labelCol={{ span: 6 }}>
              <Input placeholder="Văn bản tìm kiếm" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default LayoutAdmin;
