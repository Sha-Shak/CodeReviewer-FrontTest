import {
  GithubOutlined,
  LineChartOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
  StarTwoTone,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Result, Spin, Switch, message } from "antd";
import { useParams } from "react-router-dom";
import { IStudent } from "../interfaces/student/student.interface";
import { useEffect, useState } from "react";
import { serverFetch } from "../utils/handleRequest";
import StudentPositionChart from "../Components/Charts/StudentPositionChart";
import conf from "../config";
import logo from './../assets/new-logo.jpg';
import SkillsReportChart from "../Components/Charts/SkillsReportChart";
import PersonalityTagsContainer from "../Components/Personality/PersonalityTagsContainer";
import { parseName } from "../utils/helper";
import EditStudentDetailsModal from "../Components/Modals/EditStudentDetailsModal";
import ConvertStudentModal from "../Components/Modals/ConvertStudentModal";
import ProgressLineChart from "../Components/Charts/ProgressLineChart";



const ProfilePage = () => {

  let { id } = useParams();

  const [student, setStudent] = useState<IStudent | null | "">(null);
  const [imgUrl, setImgUrl] = useState<string>(logo);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleLoading, setToggleLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();


  const displayMessage = (type: "error" | "info" | "success", message: string) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  function setUpdatedStudent (update: IStudent) {
    setStudent(update);
  }

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
        displayMessage("error", 'An error occured while fetching student details.');
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

  async function handleModelToggle() {
    try {
      if (student) {
        setToggleLoading(true);
        const url = `${conf.API_BASE_URL}/students/model/toggle/${student._id}`;
        const updatedStudent: IStudent = await serverFetch("put", url);
        setStudent(updatedStudent);
        displayMessage("success", `Successfully changed details for ${student.name}.`);
        setToggleLoading(false);
      }
    } catch (error) {
      console.log(error);
      displayMessage("error", 'An error occured while updating student details.');
      setToggleLoading(false);
    }
  }


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
                    <div className="edit-profile-btn">
                      <ConvertStudentModal student={student} displayMessage={displayMessage} setUpdatedStudent={setUpdatedStudent} />
                      <EditStudentDetailsModal student={student} displayMessage={displayMessage} setUpdatedStudent={setUpdatedStudent} />
                    </div>
                    <p className="phone">
                      <PhoneOutlined /> {"    "}
                      {student.phone}
                    </p>
                    <p className="email">
                      {" "}
                      <MailOutlined /> {student.email}
                    </p>
                    <p className="ghUserName">
                      {" "}
                      <GithubOutlined /> {student.ghUserName}
                    </p>
                    <p className="student ">
                      {" "}
                      <LineChartOutlined /> {parseName(student.studentType)}
                    </p>
                    <p className="model">
                      {" "}
                      <span>{student.model ?
                        <StarTwoTone twoToneColor="#8884d8" />
                        : <StarOutlined />} Model
                      </span>
                      <Switch
                        style={{ marginRight: 10 }}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        loading={toggleLoading}
                        checked={student.model}
                        onChange={handleModelToggle}
                      />
                    </p>
                  </div>
                  <PersonalityTagsContainer id={student._id} type="student" />
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
                  <div className="row">
                    <ProgressLineChart id={student._id} />
                  </div>
                </div>
                <div className="rightSideBar">
                  <Button type="primary" onClick={() => displayMessage("info", 'Whoops! This has not been implemented, yet.')}><TeamOutlined />Build team</Button>
                </div>
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
