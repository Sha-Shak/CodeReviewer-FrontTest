import { Alert, Button, Form, Input, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { ISingleSkillMark } from "../../interfaces/marks/singleSkillMark.interface";
import { ISkills } from "../../interfaces/marks/skills.interface";
import { serverFetch } from "../../utils/handleRequest";
import SkillsSlider from "../SkillsSlider";

type SkillRatings = { [key: string]: number };

const ProspectHardSkill = ({
  submitMarkUrl,
  hardSkillUrl,
}: {
  submitMarkUrl: string;
  hardSkillUrl: string;
  id: string;
}) => {
  const [form] = Form.useForm();

  // const submitMarkUrl =conf.API_BASE_URL +`/prospect/interview/add/tech-interview/${id}`;
  //const hardSkillUrl = conf.API_BASE_URL + `/skill/hard-skill`;
  const [ratings, setRatings] = useState<SkillRatings>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => setMessage(message);
  const [skills] = useFetchData<ISkills[]>(
    hardSkillUrl,
    "skills",
    notify,
    setLoading
  );
  const [filteredSkills, setFilteredSkills] = useState<ISkills[]>([]);

  useEffect(() => {
    if (Array.isArray(skills)) {
      const filteredSkills = skills.filter(
        (skill) =>
          skill.name !== "back-end" &&
          skill.name !== "typescript" &&
          skill.name !== "front-end"
      );
      setFilteredSkills(filteredSkills);
    }
  }, [skills]);

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleRatingChange = async (skillId: string, rating: number) => {
    await setRatings({ ...ratings, [skillId]: rating });
    console.log("ratings", ratings);
  };

  const resetSliderValues = () => {
    const newRatings: SkillRatings = {};
    if (Array.isArray(skills)) {
      skills.forEach((skill) => {
        newRatings[skill._id] = 1;
      });
      setRatings(newRatings);
    }
  };
  const validateForm = () => {
    const sliderValues = Object.values(ratings);

    if (
      sliderValues.some((value) => {
        if (value < 2) {
          console.log("value list", value);
          return true;
        }
      }) ||
      !description.trim()
    ) {
      setMessage(
        "Please fill all form fields and ensure slider values are more than 2."
      );
      return false;
    }
    return true;
  };
  const onFinish = async () => {
    if (!validateForm()) {
      return;
    }

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

    try {
      const response = await serverFetch<any>("post", submitMarkUrl, data);
      if (response.prospectId) {
        setMessage("Form submitted successfully!");
        setTimeout(() => setMessage(null), 5000);
        form.resetFields();
        resetSliderValues();
      } else {
        setMessage("Form submission failed. Please try again");
      }
    } catch (error) {
      setMessage("An error occurred");
    } finally {
      setLoading(false);
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
          {Array.isArray(filteredSkills) &&
            filteredSkills.map((skill) => (
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
