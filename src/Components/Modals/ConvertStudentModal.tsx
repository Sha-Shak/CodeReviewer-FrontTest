import { Button, Modal, Popconfirm } from "antd"
import { IStudent } from "../../interfaces/student/student.interface"
import { useState } from "react";
import { CheckOutlined, CloseCircleFilled, CloseOutlined, QuestionCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { parseName } from "../../utils/helper";
import conf from "../../config";
import { serverFetch } from "../../utils/handleRequest";

function ConvertStudentModal({ student, displayMessage, setUpdatedStudent }:
  {
    student: IStudent,
    displayMessage: (type: "error" | "success" | "info", message: string) => void,
    setUpdatedStudent: (update: IStudent) => void
  }) {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [converting, setConverting] = useState<boolean>(false);
  const [expelling, setExpelling] = useState<boolean>(false);

  async function convert() {
    try {
      setConverting(true);
      const url = `${conf.API_BASE_URL}/students/convert/${student._id}`;
      const updatedStudent = await serverFetch('put', url);
      setUpdatedStudent(updatedStudent);
      setConverting(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error');
      displayMessage("error", "An error occured while converting student.")
      setConverting(false);
    }
  }

  async function expel() {
    try {
      setExpelling(true);
      const url = `${conf.API_BASE_URL}/students/expel/${student._id}`;
      const updatedStudent = await serverFetch('put', url);
      setUpdatedStudent(updatedStudent);
      setExpelling(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error');
      displayMessage("error", "An error occured while expelling student.")
      setExpelling(false);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const nextStage = (current: string) => {
    switch (current) {
      case "pre-course":
        return 'junior';
      case "junior":
        return 'senior';
      case "senior":
        return 'alumni';
      default:
        return 'expelled';
    }
  }

  return (
    <>
      <Button type="primary" icon={<RetweetOutlined />} onClick={showModal}>Convert</Button>

      <Modal
        title="Convert student"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="convert-cancel-button" ghost onClick={handleCancel} disabled={converting || expelling}>Cancel</Button>,
        ]}
      >
        <div className="convert-modal-container">
          {student.studentType !== 'expelled' ?
            <div className="convert-modal-section convert-section">
              <h4>Convert</h4>
              {student.studentType !== 'alumni' ?
                <>
                  <p>Convert a student to the next stage of the program.</p>
                  <div>
                    <b>{parseName(student.studentType)} ➡️ {parseName(nextStage(student.studentType))}</b>
                  </div>

                  <Popconfirm
                    placement="bottom"
                    title="Convert student"
                    description="Are you sure you want to convert this student?"
                    onConfirm={convert}
                    okText="Yes"
                    cancelText="No"
                    cancelButtonProps={{ ghost: true, icon: <CloseOutlined />, disabled: converting }}
                    okButtonProps={{ icon: <CheckOutlined /> }}
                  >
                    <Button type="primary" icon={<RetweetOutlined />} loading={converting} style={{ marginTop: 20 }}>Convert</Button>
                  </Popconfirm>
                </> 
                : 
                <>
                  <p>This student is an alumni and is at the final stage of the Project Code program.</p>
                </>}
            </div>
            : null
          }
          <div className="convert-modal-section expel-section">
            {student.studentType !== 'expelled' ?
              <>
                <h4>Danger Zone</h4>
                <p>Use this section to mark a student as expelled from the Project Code program.</p>

                <Popconfirm
                  placement="bottom"
                  title="Expel student"
                  description="Are you sure you want to expel this student?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={expel}
                  okText="Yes"
                  cancelText="No"
                  cancelButtonProps={{ ghost: true, danger: true, icon: <CloseOutlined />, disabled: expelling }}
                  okButtonProps={{ icon: <CheckOutlined />, danger: true }}
                >
                  <Button danger type="primary" icon={<CloseCircleFilled />} loading={expelling} style={{ marginTop: 20 }}>Expel</Button>
                </Popconfirm>
              </>
              :
              <>
                <h4>Expelled</h4>
                <p>This student has been expelled from the Project Code program.</p>
              </>}
          </div>

        </div>
      </Modal>
    </>
  )
}

export default ConvertStudentModal