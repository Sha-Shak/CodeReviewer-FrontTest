import { Button, Modal, Select, Spin } from "antd";
import { useEffect, useState } from 'react';
import { IPersonalityTagCount } from "../../interfaces/personality/personalityTagCount.interface";
import { IPersonalityTag } from "../../interfaces/personality/personalityTag.interface";
import conf from "../../config";
import { serverFetch } from "../../utils/handleRequest";
import PersonalityTag from "./PersonalityTag";
import { PlusOutlined } from "@ant-design/icons";
import { parseName } from "../../utils/helper";

function PersonalityTagsContainer({ id, type } : { id: string, type: 'student' | 'prospect' }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personTags, setPersonTags] = useState<IPersonalityTagCount[]>([]);
  const [allTags, setAllTags] = useState<IPersonalityTag[]>([]);
  const [instructorTags, setInstructorTags] = useState<IPersonalityTagCount[]>([]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);


  useEffect(() => {
    fetchTags();
    fetchPersonTags();
  }, []);


  async function fetchTags() {
    try {
      setModalLoading(true);
      const tagsUrl = `${conf.API_BASE_URL}/personality/all`;
      const allTags: IPersonalityTag[] = await serverFetch("get", tagsUrl);
      setAllTags(allTags);
      if (type === "student") await fetchInstructorGivenTags();
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
      console.log(error);
    }
  }


  async function fetchPersonTags() {
    try {
      setLoading(true);
      const studentUrl = type === "student" ? `${conf.API_BASE_URL}/personality/student/${id}` : `${conf.API_BASE_URL}/personality/interview/prospect/${id}`;
      const stuTags: IPersonalityTagCount[] = await serverFetch("get", studentUrl);
      setPersonTags(arrangeTags(stuTags));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchInstructorGivenTags() {
    try {
      const url = `${conf.API_BASE_URL}/personality/instructor/${id}`;
      const tags: IPersonalityTag[] = await serverFetch("get", url);
      const parsedTags = tags.map(tag => ({...tag, tagId: tag._id, count: 1}));
      setInstructorTags(parsedTags);
    } catch (error) {
      console.log(error);
      throw new Error('error in fetching instructor tags.');
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
      const body = { tags: selectedTags, ...(type === 'student' ? {reviewerType: "instructor"} : {}) };
      const url = type === 'student' ? `${conf.API_BASE_URL}/personality/instructor/${id}` : `${conf.API_BASE_URL}/personality/interview/submission/${id}`;
      await serverFetch('post', url, body);
      await fetchPersonTags();
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
      {personTags.map(tag => <PersonalityTag key={`personality-${tag.name}`} tag={tag} />)}
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
          defaultValue={(type === "student" ? instructorTags : personTags).map(tag => tag.tagId)}
          options={allTags.map((tag) => ({ label: parseName(tag.name), value: tag._id }))}
        />
      </Spin>
    </Modal>
  </Spin>
  )
}

export default PersonalityTagsContainer