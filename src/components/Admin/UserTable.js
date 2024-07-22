import {
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  message,
  notification,
} from "antd";
import LayoutAdmin from "./LayoutAdmin";
import {
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
  LinkOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { delCongTrinh, getDetail } from "../../services/getDetail";
import CongTrinhModalCreate from "./ConTrinhModalCreate";
import * as XLSX from "xlsx";
import ModalUpdate from "./ModalUpdate";
const UserTable = () => {
  const [data, setData] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  useEffect(() => {
    fetchApi();
  }, [current, pageSize, filter, sortQuery]);

  const fetchApi = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await getDetail(query);
    if (res && res.length > 0) {
      setData(res);
      setTotal(res.length);
    }
  };
  console.log("Check total", total);

  const columns = [
    {
      title: "TT",
      dataIndex: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Đính kèm",
      dataIndex: "path",
      sorter: true,
      render: (text, record, index) => {
        // console.log("Check record", record);
        return (
          <>
            <a href={record.path} target="_black">
              <LinkOutlined />
            </a>
          </>
        );
      },
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Tạp chí xuất bản",
      dataIndex: "publishing",
      sorter: true,
    },
    {
      title: "Thông tin",
      dataIndex: "info",
      sorter: true,
    },
    {
      title: "Năm học",
      dataIndex: "year",
      sorter: true,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteCongTrinh(record.id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer", margin: "0 20px" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>

            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `_sort=${sorter.field}`
          : `_sort=-${sorter.field}`;
      setSortQuery(q);
    }
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  const handleDeleteCongTrinh = async (id) => {
    const res = await delCongTrinh(id);
    if (res) {
      message.success("Xóa user thành công");
      fetchApi();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  const renderHeader = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Table List Công trình</span>
          <span style={{ display: "flex", gap: 15 }}>
            <Button
              icon={<ExportOutlined />}
              type="primary"
              onClick={() => handleExportData()}
            >
              Export
            </Button>

            <Button icon={<CloudUploadOutlined />} type="primary">
              Import
            </Button>

            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setOpenModalCreate(true)}
            >
              Thêm mới
            </Button>
            <Button
              type="ghost"
              onClick={() => {
                setFilter("");
                setSortQuery("");
              }}
            >
              <ReloadOutlined />
            </Button>
          </span>
        </div>
      </>
    );
  };
  const handleExportData = () => {
    if (data.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "ExportCongTrinh.csv");
    }
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <LayoutAdmin handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]} - {range[1]} trên {total} rows
                  </div>
                );
              },
            }}
            className="def"
            columns={columns}
            dataSource={data}
            onChange={onChange}
            // loading={isLoading}
          />
        </Col>
      </Row>
      <CongTrinhModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchApi={fetchApi}
      />
      <ModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchApi={fetchApi}
      />
    </>
  );
};
export default UserTable;
