import { Alert, Button, Col, Form, Input, Row, Select, Space, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import conf from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { ISingleSkillMark } from "../../interfaces/marks/singleSkillMark.interface";
import { ISkills } from "../../interfaces/marks/skills.interface";
import { serverFetch } from "../../utils/handleRequest";
import SkillsSlider from "../SkillsSlider";
import { prospectStage } from '../../utils/prospectStage'
import { Option } from "antd/es/mentions";

type SkillRatings = { [key: string]: number };

const ProspectAssignment = ({ currentStage }: { currentStage: string}) => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const submitMarkUrl =
    conf.API_BASE_URL + `/prospect/interview/add/coding-assignment/${id}`;
  const [ratings, setRatings] = useState<SkillRatings>({});
  const hardSkillUrl = conf.API_BASE_URL + `/skill/hard-skill`;
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => setMessage(message);
  const [hardSkills] = useFetchData<ISkills[]>(
    hardSkillUrl,
    "skills",
    notify,
    setLoading
  );

  const [description, setDescription] = useState("");
  const [stage, setStage] = useState(currentStage);
  const handleStageChange = (value: string) => {
    setStage(value);
    console.log(stage);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleRatingChange = (skillId: string, rating: number) => {
    setRatings({ ...ratings, [skillId]: rating });
  };

  const resetSliderValues = () => {
    const newRatings: SkillRatings = {};
    if (Array.isArray(hardSkills)) {
      hardSkills.forEach((skill) => {
        newRatings[skill._id] = 1; // Set the default rating to 1
      });
      setRatings(newRatings);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const skillMarks: ISingleSkillMark[] = Object.keys(ratings).map(
      (skillId) => ({
        skillId,
        marks: ratings[skillId],
      })
    );
    const data = {
      skills: skillMarks,
      stage,
      notes: description,
    };
    const sliderValues = Object.values(ratings);
    if (sliderValues.some((value) => value < 2) || !values.description) {
      setMessage(
        "Please fill all form fields and ensure slider values are more than 2."
      );
      setLoading(false);
    } else {
      console.log("final data", data);
      try {
        //! need to change in the future
        const response = await serverFetch<any>("post", submitMarkUrl, data);
        if (response.prospectId) {
          setMessage("Form submitted successfully!");
          setTimeout(() => setMessage(null), 5000);
          form.resetFields();
          resetSliderValues();
          setLoading(false);
        } else {
          setMessage("Form submission failed. Please try again");
          setLoading(false);
        }
      } catch (error) {
        setMessage("An error occured");
        setLoading(false);
      }
    }
  };

  return (
    <Spin spinning={loading} tip="Fetching questions..." size="large">
      <Form form={form} name="rating-form" onFinish={onFinish}>
        {message && (
          <Alert
            message={message}
            type={message.startsWith("Form submitted") ? "success" : "error"}
            showIcon
            closable
            onClose={() => setMessage(null)}
          />
        )}
        <Space className="space" direction="vertical" style={{ width: "100%" }}>
          {Array.isArray(hardSkills) &&
            hardSkills
              .filter(
                (skill) =>
                  skill.name !== "back-end" && skill.name !== "typescript"
              )
              .map((skill) => (
                <SkillsSlider
                  key={skill.name}
                  skill={skill}
                  rating={ratings[skill._id] || 1}
                  onRatingChange={(rating) =>
                    handleRatingChange(skill._id, rating)
                  }
                  form={form}
                />
              ))}
          <Row>
            <Col span={8}>
              <Form.Item
                label="Stage"
                name="stage"
                rules={[
                  {
                    required: true,
                    message: "Please select Stage",
                  },
                ]}
              >
                <Select style={{ width: "100%" }} onChange={handleStageChange}>
                  {prospectStage.map((el: { name: string; value: string }) => (
                    <Option value={el.value}>{el.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="h3-label"
            label="Coding Assignment Notes"
            name="description"
            rules={[
              {
                max: 1000,
                message: "Notes cannot exceed 1000 characters",
              },
            ]}
          >
            <Input.TextArea
              className="h3-label"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Spin>
  );
};

export default ProspectAssignment;
