import {
  GithubOutlined,
  LineChartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Result, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import { IStudent } from "../interfaces/student/student.interface";
import { useEffect, useState } from "react";
import { serverFetch } from "../utils/handleRequest";
import StudentPositionChart from "../Components/Charts/StudentPositionChart";
import conf from "../config";
import logo from './../assets/new-logo.jpg';
import SkillsReportChart from "../Components/Charts/SkillsReportChart";
import PersonalityTagsContainer from "../Components/Personality/PersonalityTagsContainer";



const ProfilePage = () => {

  let { id } = useParams();

  const [student, setStudent] = useState<IStudent | null | "">(null);
  const [imgUrl, setImgUrl] = useState<string>(logo);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();


  const displayErrorMessage = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };


  useEffect(() => {
    async function fetchStudent() {
      try {
        const url = `${conf.API_BASE_URL}/students/profile/` + id;
        setLoading(true);
        const student: IStudent = await serverFetch("get", url);
        setStudent(student);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        displayErrorMessage('An error occured while fetching student details.');
      }
    };

    fetchStudent();
  }, [])


  useEffect(() => {
    async function getStudentImage() {
      try {
        if (student && student?.ghUserName) {
          const url = `${conf.API_BASE_URL}/github/user/avatar/${student?.ghUserName}`
          const data: { imgUrl: string } = await serverFetch('get', url);
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
      {contextHolder}
      <Spin spinning={loading} tip="Fetching student details..." size="large">
        <div className="profileBody">
          {
            student ?
              <>
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
                  <PersonalityTagsContainer />
                </div>
                <div className="content">
                  <div className="row">
                    <SkillsReportChart id={student._id} type="soft-skills" />
                    <SkillsReportChart id={student._id} type="hard-skills" />
                  </div>
                  <div className="row">
                    <SkillsReportChart id={student._id} type="peer-review" />
                    <StudentPositionChart id={student._id} />
                  </div>
                </div>
                <div className="rightSideBar">Right</div>
              </>
              : student === "" ?
                <Result
                  status="404"
                  title="Student not found"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<Button type="primary">View Current Students</Button>}
                />
                : null
          }
        </div>

      </Spin>
    </>
  );
};

export default ProfilePage;
