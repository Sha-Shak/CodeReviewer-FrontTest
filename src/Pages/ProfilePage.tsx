import {
  GithubOutlined,
  LineChartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { useParams } from "react-router-dom";
import { IStudent } from "../interfaces/student/student.interface";
import { useEffect, useState } from "react";
import { serverFetch } from "../utils/handleRequest";
import SoftSkillsChart from "../Components/SoftSkillsChart";
import HardSkillsChart from "../Components/HardSkillsChart";
import StudentPositionChart from "../Components/Charts/StudentPositionChart";
import conf from "../config";
import logo from './../assets/new-logo.jpg';



const ProfilePage = () => {

  let { id } = useParams();

  const [student, setStudent] = useState<IStudent | undefined>(undefined);
  const [imgUrl, setImgUrl] = useState<string>(logo)

  useEffect(() => {
    async function fetchStudent() {
      const url = "https://code-reviewer-server-projectcode.koyeb.app/students/profile/" + id;
      const student : IStudent = await serverFetch("get", url);
      setStudent(student);
    };

    fetchStudent();
  }, [])


  useEffect(() => {
    async function getStudentImage() {
      try {
        if (student?.ghUserName) {
          const url = `${conf.API_BASE_URL}/github/user/avatar/${student?.ghUserName}`
          const data : { imgUrl: string } = await serverFetch('get', url);
          setImgUrl(data.imgUrl);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getStudentImage()
  }, [student])


  return (
    <>
      {
        student && 
        <div className="profileBody">
          <div className="leftSideBar">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<img src={imgUrl} />}
            />
            <div className="info">
              <h2 className="name">{student.name}</h2>
              <h2 className="phone">
                <PhoneOutlined /> {"    "}
                {student.phone}
              </h2>
              <h2 className="email">
                {" "}
                <MailOutlined /> {student.email}
              </h2>
              <h2 className="ghUserName">
                {" "}
                <GithubOutlined /> {student.ghUserName}
              </h2>
              <h2 className="student ">
                {" "}
                <LineChartOutlined /> {student.studentType}
              </h2>
            </div>
          </div>
          <div className="content">
            <div className="row">
              <SoftSkillsChart id={student._id} />
              <HardSkillsChart id={student._id} />
            </div>
            <div className="row">
              <SoftSkillsChart id={student._id} />
              <StudentPositionChart id={student._id} />
            </div>
          </div>
          <div className="rightSideBar">Right</div>
        </div>
      }
    </>
  );
};

export default ProfilePage;
