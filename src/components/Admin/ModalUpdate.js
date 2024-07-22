import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  notification,
} from "antd";
import { callUpdate } from "../../services/getDetail";

const ModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { id, title, summary, keyword, note } = values;
    setIsSubmit(true);
    const res = await callUpdate(id, title, summary, keyword, note);
    if (res) {
      message.success("Cập nhật user thành công");
      setOpenModalUpdate(false);
      await props.fetchApi();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Cập nhật công trình"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        okText={"Cập nhật"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />

        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          // initialValues={dataUpdate}
        >
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="Id"
            name="id"
            rules={[{ required: true, message: "Vui lòng nhập Id!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Năm học"
            name="year"
            rules={[{ required: true, message: "Vui lòng nhập Id!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Tóm tắt"
            name="summary"
            rules={[{ required: true, message: "Vui lòng nhập tóm tắt!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Từ khóa"
            name="keyword"
            rules={[{ required: true, message: "Vui lòng nhập từ khóa!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Vui lòng nhập từ khóa!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tạp chí xuất bản"
            name="publishing"
            rules={[
              { required: true, message: "Vui lòng nhập tạp chí xuất bản!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Thông tin xuất bản"
            name="info"
            rules={[
              { required: true, message: "Vui lòng nhập thông tin xuất bản!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Đường dẫn"
            name="path"
            rules={[{ required: true, message: "Vui lòng nhập đường dẫn!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Ghi chú"
            name="note"
            rules={[{ required: true, message: "Vui lòng nhập ghi chú!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdate;
