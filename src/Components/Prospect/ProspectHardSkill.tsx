import { Alert, Button, Form, Input, Space, Spin } from "antd";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import conf from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { ISingleSkillMark } from "../../interfaces/marks/singleSkillMark.interface";
import { ISkills } from "../../interfaces/marks/skills.interface";
import { serverFetch } from "../../utils/handleRequest";
import SkillsSlider from "../SkillsSlider";

type SkillRatings = { [key: string]: number };

const ProspectHardSkill = () => {
  const [form] = Form.useForm();
  let { id } = useParams();
  const submitMarkUrl =
    conf.API_BASE_URL +
    `/prospect/hard-skills/add/interview/${id}/tech-interview`;
  const [ratings, setRatings] = useState<SkillRatings>({});
  const hardSkillUrl = conf.API_BASE_URL + `/skill/hard-skill`;
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => setMessage(message);
  const memoizedUseFetchData = useMemo(() => {
    return useFetchData<ISkills[]>(hardSkillUrl, "skills", notify, setLoading);
  }, [hardSkillUrl, notify, setLoading]);
  const [skills, setSkills] = memoizedUseFetchData;

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
    if (Array.isArray(skills)) {
      skills.forEach((skill) => {
        newRatings[skill._id] = 1; // Set the default rating to 1
      });
      setRatings(newRatings);
    }
  };

  const onFinish = async () => {
    setLoading(true);
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

    // Validate form fields
    const sliderValues = Object.values(ratings);
    if (
      sliderValues.some((value) => value < 2) ||
      !data.notes ||
      data.notes.trim() === ""
    ) {
      setMessage(
        "Please fill all form fields and ensure slider values are more than 2."
      );
        setLoading(false);
    } else {
      // Data is valid, proceed with submission
      try {
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
          {Array.isArray(skills) &&
            skills
              .filter(
                (skill) =>
                  skill.name !== "back-end" &&
                  skill.name !== "typescript" &&
                  skill.name !== "front-end"
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

export default ProspectHardSkill;