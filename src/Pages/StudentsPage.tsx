import { Table } from "antd";
import { useEffect, useState } from "react";
import { IStudent } from "../interfaces/student/student.interface";
import { serverFetch } from "../utils/handleRequest";

import { ColumnsType, TableProps } from "antd/es/table";
import LineCharts from "../Components/Charts/LineCharts";
import StudentRadarChart from "../Components/Charts/RadarChart";
import StudentMarksChart from "../Components/Charts/StudentMarksBar";
import { useNavigate } from "react-router-dom";

const columns: ColumnsType<IStudent> = [
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
    dataIndex: "cohort",
  },
  {
    title: "Type",
    dataIndex: "studentType",
  },
];

const StudentsPage = () => {
  const url = "https://code-reviewer-server-projectcode.koyeb.app/students/all";
  const [students, setStudents] = useState<IStudent[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      const res = (await serverFetch("get", url)) as IStudent[];
      setStudents(res);
      console.log(typeof res);
    };
    fetchData();
  }, []);

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
      <div className="charts">
        <LineCharts />
        <StudentMarksChart />
        <StudentRadarChart />
      </div>
      <div className="tableBody">

      <Table columns={columns} dataSource={students} onChange={onChange} rowKey='_id' onRow={(record)=>({
        onClick: ()=>{
          navigate(`/profile/${record._id}`)
        }
      })}  />
      </div>
    </>
  );
};

export default StudentsPage;
