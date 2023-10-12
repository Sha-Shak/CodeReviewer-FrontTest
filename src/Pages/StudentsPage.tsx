import { Table } from "antd";
import { useEffect, useState } from "react";
import { IStudent } from "../interfaces/student/student.interface";
import { serverFetch } from "../utils/handleRequest";

import { ColumnsType, TableProps } from "antd/es/table";
import LineCharts from "../Components/Charts/LineCharts";
import StudentRadarChart from "../Components/Charts/RadarChart";
import StudentMarksChart from "../Components/Charts/StudentMarksBar";
import { useNavigate } from "react-router-dom";
import conf from "../config";
import { ICohort } from "../interfaces/student/cohort.interface";

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
  const [students, setStudents] = useState<(IStudent & {cohortInfo: ICohort})[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      const res : (IStudent & {cohortInfo: ICohort})[] = await serverFetch("get", url);
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
