import { Button, Modal, Radio, RadioChangeEvent, Select } from "antd"
import { useEffect, useState } from "react";
import { IPersonalityTag } from "../../interfaces/personality/personalityTag.interface";
import conf from "../../config";
import { serverFetch } from "../../utils/handleRequest";
import { parseName } from "../../utils/helper";

function PersonalityTagsContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalityTags, setPersonalityTags] = useState<IPersonalityTag[]>([]);
  const [skillTags, setSkillTags] = useState<IPersonalityTag[]>([]);
  const [selectedType, setSelectedType] = useState<string>("personality");
  const tagOptions = [{label: "Personality", value: "personality"}, {label: "Skill", value: "skill"}]

  useEffect(() => {
    async function fetchTags () {
      try {
        const url1 = `${conf.API_BASE_URL}/personality/type/personality`;
        const url2 = `${conf.API_BASE_URL}/personality/type/skill`;
        const pTags : IPersonalityTag[] = await serverFetch("get", url1);
        const sTags : IPersonalityTag[] = await serverFetch("get", url2);
        setPersonalityTags(pTags);
        setSkillTags(sTags);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTags();
  }, [])

  function handleTypeChange (e: RadioChangeEvent) {
    setSelectedType(e.target.value);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: {label: string,  value: IPersonalityTag}) => {
    console.log(value);
  }

  return (
    <>
      <div>Tags</div>
      <Button type="primary" onClick={showModal}>Add tags</Button>
      <Modal title="Add Tags" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Radio.Group 
        onChange={handleTypeChange} 
        options={tagOptions} 
        optionType="button"
        buttonStyle="solid"
        defaultValue="personality"
      />
      <Select
          mode="tags"
          size="middle"
          placeholder="Select tags"
          onChange={handleChange}
          style={{ width: '100%', marginTop: 20 }}
          options={(selectedType === "personality" ? personalityTags : skillTags).map((tag) => ({label: parseName(tag.name), value: tag.name}))}
        />
      </Modal>
    </>
  )
}

export default PersonalityTagsContainer