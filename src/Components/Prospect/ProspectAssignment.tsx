import { Button, Form, Input, Space, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import conf from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { ISingleSkillMark } from "../../interfaces/marks/singleSkillMark.interface";
import { ISkills } from "../../interfaces/marks/skills.interface";
import { serverFetch } from "../../utils/handleRequest";
import SkillsSlider from "../SkillsSlider";

//! TODO: need to add loader and prevent user from submitting the form twice.

type SkillRatings = { [key: string]: number };

const ProspectAssignment = () => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const submitMarkUrl =
    conf.API_BASE_URL +
    `/prospect/hard-skills/add/interview/${id}/coding-assignment`;
  const [ratings, setRatings] = useState<SkillRatings>({});
  const hardSkillUrl = conf.API_BASE_URL + `/skill/hard-skill`;
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => setMessage(message);
  const [hardSkills, setHardSkills] = useFetchData<ISkills[]>(
    hardSkillUrl,
    "skills",
    notify,
    setLoading
  );

  const [description, setDescription] = useState("");

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

  const onFinish = () => {
    const skillMarks: ISingleSkillMark[] = Object.keys(ratings).map(
      (skillId) => ({
        skillId,
        marks: ratings[skillId],
      })
    );
    const data = {
      skills: skillMarks,

      notes: description,
    };
    console.log("final data", data);
    form.resetFields();
    resetSliderValues();
    //! TODO: need to change prospect's status
    serverFetch("post", submitMarkUrl, data);
  };

  return (
    <Spin spinning={loading} tip="Fetching questions..." size="large">
      <Form form={form} name="rating-form" onFinish={onFinish}>
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
                  form
                />
              ))}
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
