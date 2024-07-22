import {
  Divider,
  Form,
  Input,
  Modal,
  Select,
  message,
  notification,
} from "antd";

import { useState } from "react";
import { createCongTrinh } from "../../services/getDetail";

const CongTrinhModalCreate = (props) => {
  // const [openModalCreate, setOpenModalCreate] = useState(false);
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const [dataCreate, setDataCreate] = useState({});
  const handleCancel = () => {
    setOpenModalCreate(false);
  };
  const onFinish = async (values) => {
    setIsSubmit(true);
    const res = await createCongTrinh(values);
    console.log("check res create", res);
    if (res) {
      message.success("Tạo mới user thành công");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchApi();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
    console.log("Success:", values);
  };
  return (
    <>
      <Modal
        title="Thêm mới công trình khoa học công nghệ"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider></Divider>

        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Năm học"
            name="year"
            rules={[
              { required: true, message: "Please input your year school!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tóm tắt"
            name="summary"
            rules={[{ required: true, message: "Please input your summary!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Từ khóa"
            name="keyword"
            rules={[{ required: true, message: "Please input your keyword!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Please input your author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tạp chí xuất bản"
            name="publishing"
            rules={[
              { required: true, message: "Please input your publishing!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Thông tin xuất bản"
            name="info"
            rules={[{ required: true, message: "Please input your info!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Đường dẫn"
            name="path"
            rules={[{ required: true, message: "Please input your path!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Ghi chú"
            name="note"
            rules={[{ required: true, message: "Please input your note!" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CongTrinhModalCreate;
