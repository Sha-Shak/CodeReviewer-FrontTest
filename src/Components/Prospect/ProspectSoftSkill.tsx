import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import conf from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { ISingleSkillMark } from "../../interfaces/marks/singleSkillMark.interface";
import { ISkills } from "../../interfaces/marks/skills.interface";
import { serverFetch } from "../../utils/handleRequest";
import { prospectStage } from "../../utils/prospectStage";
import SkillsSlider from "../SkillsSlider";

//! TODO: need to add loader and prevent user from submitting the form twice.

type SkillRatings = { [key: string]: number };

const ProspectSoftSKill = ({ report }: { report: string }) => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const submitMarkUrl =
    conf.API_BASE_URL + `/prospect/soft-skills/add/${report}/${id}`;
  const [ratings, setRatings] = useState<SkillRatings>({});
  const softSkillUrl = conf.API_BASE_URL + `/skill/soft-skill`;
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => setMessage(message);

  const [softSkills] = useFetchData<ISkills[]>(
    softSkillUrl,
    "skills",
    notify,
    setLoading
  );
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [stage, setStage] = useState<string>("");
  const [description, setDescription] = useState("");

  const handleEducationChange = (value: string) => {
    setEducation(value);
  };
  const handleExperienceChange = (value: string) => {
    setExperience(value);
  };
  const handleStageChange = (value: string) => {
    setStage(value);
    console.log(stage);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const { Option } = Select;
  const handleRatingChange = (skillId: string, rating: number) => {
    setRatings({ ...ratings, [skillId]: rating });
  };

  const resetSliderValues = () => {
    const newRatings: SkillRatings = {};
    if (Array.isArray(softSkills)) {
      softSkills.forEach((skill) => {
        newRatings[skill._id] = 1;
      });
      setRatings(newRatings);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const skillMarks: ISingleSkillMark[] = Object.keys(ratings)
      .map((skillId) => ({
        skillId,
        marks: ratings[skillId],
      }))
      .filter((mark) => mark.marks >= 2);

    const data = {
      skills: skillMarks,
      education,
      experience,
      notes: description,
      stage: stage,
    };

    //* for future: if val<2 then remove the item

    const areAllSliderValuesValid = Object.values(ratings).some(
      (value) => value > 2
    );

    if (values.description && values.education && values.experience) {
      try {
        console.log("checking data", data);
        const response = await serverFetch("post", submitMarkUrl, data);
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
        setMessage("An error occurred");
        setLoading(false);
      }
    } else {
      setMessage(
        "Please fill all form fields and ensure all slider values are more than 2."
      );
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Please wait..." size="large">
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
          {Array.isArray(softSkills) &&
            softSkills.map((skill) => (
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
          <Row gutter={50}>
            <Col span={8}>
              {" "}
              <Form.Item
                label="Education Level"
                name="education"
                rules={[
                  {
                    required: true,
                    message: "Please select an education level",
                  },
                ]}
              >
                <Select
                  value={education}
                  style={{ width: "100%" }}
                  onChange={handleEducationChange}
                >
                  <Option value="High School">High School</Option>
                  <Option value="University">University</Option>
                  <Option value="Masters">Masters</Option>
                  <Option value="Ph.D">Ph.D</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Experience Level"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "Please select an experience level",
                  },
                ]}
              >
                <Select
                  value={experience}
                  style={{ width: "100%" }}
                  onChange={handleExperienceChange}
                >
                  <Option value="1">Less than 1 year</Option>
                  <Option value="2">1-2 years</Option>
                  <Option value="3">3-5 years</Option>
                  <Option value="4">5 years+</Option>
                </Select>
              </Form.Item>
            </Col>
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
                  {prospectStage.map((el) => (
                    <Option value={el.value}>{el.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="h3-label"
            label="Interview Notes"
            name="description"
            rules={[
              {
                required: true,
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

export default ProspectSoftSKill;
