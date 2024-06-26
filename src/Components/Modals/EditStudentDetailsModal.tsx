import { CheckCircleOutlined, CloseCircleOutlined, EditFilled, GithubOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Popover } from "antd"
import { useState } from "react";
import { IStudent } from "../../interfaces/student/student.interface";
import conf from "../../config";
import { serverFetch } from "../../utils/handleRequest";

function EditStudentDetailsModal({ student, displayMessage, setUpdatedStudent }:
  {
    student: IStudent,
    displayMessage: (type: "error" | "success" | "info", message: string) => void,
    setUpdatedStudent: (update: IStudent) => void
  }) {

  const [updatedDetails, setUpdatedDetails] = useState<IStudent>(student);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validGithubUsername, setValidGithubUsername] = useState(!!student.ghUserName);
  const [checking, setChecking] = useState(false);

  function updateFormFields(data: { name?: string, phone?: string, email?: string, ghUserName?: string }) {

    if (data.ghUserName && data.ghUserName !== updatedDetails.ghUserName) checkGithubUsername(data.ghUserName);

    setUpdatedDetails((prevState) => {
      return { ...prevState, ...data }
    })
  }

  async function checkGithubUsername(username: string) {
    try {
      setChecking(true);
      const url = `${conf.API_BASE_URL}/github/user/check/${username}`;
      const res: { found: boolean } = await serverFetch('get', url);
      setValidGithubUsername(res.found);
      setChecking(false);
    } catch (error) {
      setValidGithubUsername(false);
      setChecking(false);
      console.log(error);
    }
  }

  async function submit() {
    try {
      setSubmitting(true);
      const url = conf.API_BASE_URL + '/students/details/' + student._id;
      const res: IStudent = await serverFetch('put', url, updatedDetails);
      setUpdatedStudent(res);
      displayMessage('success', 'Successfully updated student details.');
      setSubmitting(false);
    } catch (error) {
      displayMessage('error', 'An error occured while trying to update student details.');
      setSubmitting(false);
      console.log(error);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button ghost icon={<EditFilled />} onClick={showModal}>Edit</Button>

      <Modal
        title="Edit Student Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel-button" ghost onClick={handleCancel} disabled={submitting} >Cancel</Button>,
          <Button key="submit-button" type="primary" loading={submitting} onClick={submit}>Submit</Button>
        ]}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={student}
          onValuesChange={(_changed, allValues) => updateFormFields(allValues)}
        >
          <Form.Item label="Name" name="name">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="E-mail" name="email">
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input type="tel" prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item label="GitHub" name="ghUserName">
            <Input
              prefix={<GithubOutlined />}
              suffix={checking ?
                <LoadingOutlined style={{ color: "#8884d8" }} /> :
                validGithubUsername ?
                  <Popover content={<div className="pop-up">Valid GitHub username</div>} trigger="hover">
                    <CheckCircleOutlined style={{ color: "green" }} />
                  </Popover>
                  :
                  <Popover content={<div className="pop-up">Invalid GitHub username</div>} trigger="hover">
                    <CloseCircleOutlined style={{ color: "red" }} />
                  </Popover>

              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditStudentDetailsModal