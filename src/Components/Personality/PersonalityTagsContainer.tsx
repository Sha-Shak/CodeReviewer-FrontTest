import { Button, Modal, Select, Spin } from "antd"
import { useEffect, useState } from "react";
import { IPersonalityTag } from "../../interfaces/personality/personalityTag.interface";
import conf from "../../config";
import { serverFetch } from "../../utils/handleRequest";
import { parseName } from "../../utils/helper";
import PersonalityTag from "./PersonalityTag";
import { IPersonalityTagCount } from "../../interfaces/personality/personalityTagCount.interface";
import { PlusOutlined } from "@ant-design/icons";

function PersonalityTagsContainer({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentTags, setStudentTags] = useState<IPersonalityTagCount[]>([]);
  const [allTags, setAllTags] = useState<IPersonalityTag[]>([]);
  const [instructorTags, setInstructorTags] = useState<IPersonalityTag[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTags();
    fetchStudentTags();
  }, [])

  async function fetchTags() {
    try {
      setModalLoading(true);
      const tagsUrl = `${conf.API_BASE_URL}/personality/all`;
      const allTags: IPersonalityTag[] = await serverFetch("get", tagsUrl);
      setAllTags(allTags);
      await fetchInstructorGivenTags();
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      console.log(error);
    }
  }


  async function fetchInstructorGivenTags() {
    try {
      const url = `${conf.API_BASE_URL}/personality/instructor/${id}`;
      const tags: IPersonalityTag[] = await serverFetch("get", url);
      setInstructorTags(tags);
    } catch (error) {
      console.log(error);
      throw new Error('error in fetching instructor tags.');
    }
  }


  async function fetchStudentTags() {
    try {
      setLoading(true);
      const studentUrl = `${conf.API_BASE_URL}/personality/student/${id}`;
      const stuTags: IPersonalityTagCount[] = await serverFetch("get", studentUrl);
      setStudentTags(arrangeTags(stuTags));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function arrangeTags(tags: IPersonalityTagCount[]) {
    const positiveTags = tags.filter(tag => tag.class === "positive");
    const neutralTags = tags.filter(tag => tag.class === "neutral");
    const negativeTags = tags.filter(tag => tag.class === "negative");

    return [...positiveTags, ...neutralTags, ...negativeTags];
  }

  const showModal = () => {
    setIsModalOpen(true);
    fetchTags();
  };

  const handleOk = async () => {
    try {
      setIsModalOpen(false);
      const body = { reviewerType: "instructor", tags: selectedTags };
      const url = `${conf.API_BASE_URL}/personality/instructor/${id}`;
      await serverFetch('post', url, body);
      await fetchStudentTags();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string[]) => {
    setSelectedTags(value);
  }

  return (
    <Spin spinning={loading} tip="Fetching personality tags...">
      <h4>Tags</h4>
      <div className="tags-container">
        {studentTags.map(tag => <PersonalityTag key={`personality-${tag.name}`} tag={tag} />)}
      </div>
      <Button type="primary" onClick={showModal} size="large" icon={<PlusOutlined />}>Add tags</Button>
      <Modal title="Add Tags" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Spin spinning={modalLoading} tip="Fetching personality tags...">
          <Select
            mode="tags"
            size="middle"
            placeholder="Select tags"
            onChange={handleChange}
            style={{ width: '100%', marginTop: 20 }}
            defaultValue={instructorTags.map(tag => tag._id)}
            options={allTags.map((tag) => ({ label: parseName(tag.name), value: tag._id }))}
          />
        </Spin>
      </Modal>
    </Spin>
  )
}

export default PersonalityTagsContainer