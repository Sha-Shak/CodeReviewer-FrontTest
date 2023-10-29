import { Table, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { IStudent } from "../interfaces/student/student.interface";
import { serverFetch } from "../utils/handleRequest";

import { ColumnsType, TableProps } from "antd/es/table";
import LineCharts from "../Components/Charts/LineCharts";
import StudentRadarChart from "../Components/Charts/RadarChart";
import StudentMarksChart from "../Components/Charts/StudentMarksBar";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../config";
import { ICohort } from "../interfaces/student/cohort.interface";
import { StarTwoTone } from "@ant-design/icons";

const columns: ColumnsType<IStudent> = [
  {
    title: "Model",
    dataIndex: "model",
    render: item => item ? <StarTwoTone twoToneColor="#8884d8" /> : ""
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "30%",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Github",
    dataIndex: "ghUserName",
  },
  {
    title: "Cohort",
    dataIndex: "cohortInfo",
    render: item => item.name.split(' ')[2]
  },
  {
    title: "Type",
    dataIndex: "studentType",
    render: item => item[0].toUpperCase() + item.slice(1)
  },
];

const StudentsPage = () => {
  const url = `${conf.API_BASE_URL}/students/all`;
  const {type= 'junior'} = useParams()
  const [messageApi, contextHolder] = message.useMessage();
  const [students, setStudents] = useState<(IStudent & { cohortInfo: ICohort })[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(false);

  const displayErrorMessage = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const students: (IStudent & { cohortInfo: ICohort })[] =
          await serverFetch("get", url);
        const filteredstudents = students.filter(
          (student) =>
            student.studentType.toLowerCase() === type.toLowerCase()
        );
        console.log("first", filteredstudents);
        setStudents(filteredstudents);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        displayErrorMessage("An error occured while fetching students.");
      }
    };
    fetchData();
    console.log("rerender students")
  }, [type]);

  const onChange: TableProps<IStudent>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const navigate = useNavigate()

  return (
    <>
      {contextHolder}
      <div>
      </div>
      <div className="tableBody">
        <Spin spinning={loading} tip="Fetching students..." size="large" >
          <Table columns={columns} dataSource={students} onChange={onChange} rowKey='_id' onRow={(record) => ({
            onClick: () => {
              navigate(`/profile/${record._id}`)
            }
          })} />
        </Spin>
      </div>
    </>
  );
};

export default StudentsPage;
