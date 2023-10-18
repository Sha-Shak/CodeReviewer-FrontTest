import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SkillsSlider from "../Components/SkillsSlider";
import conf from "../config";
import useFetchData from "../hooks/useFetchData";
import { ISingleSkillMark } from "../interfaces/marks/singleSkillMark.interface";
import { ISkills } from "../interfaces/marks/skills.interface";
import { serverFetch } from "../utils/handleRequest";

//! TODO: need to add loader and prevent user from submitting the form twice.

type SkillRatings = { [key: string]: number };

const ProspectDetailsPage = () => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const submitMarkUrl =
    conf.API_BASE_URL + `/prospect/soft-skills/add/interview/${id}`;
  const [ratings, setRatings] = useState<SkillRatings>({});
  const softSkillUrl = conf.API_BASE_URL + `/skill/soft-skill`;
  const [softSkills, setSoftSkills] = useFetchData<ISkills[]>(
    softSkillUrl,
    "skills"
  );
  const [education, setEducation] = useState("");
  const [description, setDescription] = useState("");
  const handleSelectChange = (value: string) => {
    setEducation(value);
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

  const onFinish = () => {
    const skillMarks: ISingleSkillMark[] = Object.keys(ratings).map(
      (skillId) => ({
        skillId,
        marks: ratings[skillId],
      })
    );
    const data = {
      skills: skillMarks,
      education: education,
      notes: description,
    };
    console.log("final data", data);
    serverFetch("post", submitMarkUrl, data);
  };

  return (
    <div className="tableBody">
      <Form form={form} name="rating-form" onFinish={onFinish}>
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
              />
            ))}
          <Row>
            <Col span={10} style={{ marginRight: "6.5vw" }}>
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
                  onChange={handleSelectChange}
                >
                  <Option value="High School">High School</Option>
                  <Option value="University">University</Option>
                  <Option value="Masters">Masters</Option>
                  <Option value="Ph.D">Ph.D</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="h3-label"
                label="Interview Notes"
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
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default ProspectDetailsPage;
