import { Col, Row, Slider } from "antd";
import React from "react";
import { ISkills } from "../interfaces/marks/skills.interface";
import { IStudent } from "../interfaces/student/student.interface";

interface SkillsSliderProps {
  skill: ISkills;
  rating: number;
  onRatingChange: (rating: number) => void;
  form: any;
  question?: boolean;
  student?: IStudent;
}

const SkillsSlider: React.FC<SkillsSliderProps> = ({
  skill,
  rating,
  onRatingChange,
  form,
  student,
}) => {
  const handleSliderChange = (value: number) => {
    onRatingChange(value);
    if (value < 2) {
      form.setFields([
        {
          name: `ratings.${skill._id}`,
          errors: ["Select at least 2 options."],
        },
      ]);
    } else {
      form.setFields([
        {
          name: `ratings.${skill._id}`,
          errors: [],
        },
      ]);
    }
  };

  const getTrackStyle = (rating: number) => {
    const color = rating >= 5 ? "blue" : "red";
    return { backgroundColor: color };
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <h3>{student ? student.name : skill.question}</h3>{" "}
        </Col>

        <Col span={12}>
          <Slider
            min={1}
            max={10}
            step={1}
            marks={{
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
              6: "6",
              7: "7",
              8: "8",
              9: "9",
              10: "10",
            }}
            value={rating}
            onChange={handleSliderChange}
            trackStyle={getTrackStyle(rating)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SkillsSlider;
