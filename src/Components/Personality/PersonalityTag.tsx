import { IPersonalityTagCount } from '../../interfaces/personality/personalityTagCount.interface'
import { Tag } from 'antd';
import { parseName } from '../../utils/helper';

function PersonalityTag({ tag } : { tag : IPersonalityTagCount}) {
  return (
      <Tag
        style={{
          fontSize: 13,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 3,
          paddingBottom: 3,
          margin: 3,
        }}
        color={tag.class === "positive" ? "#70bf6d" : tag.class === "negative" ? "#e06a6a" : "#d0c32e"}
      >
        {parseName(tag.name)}  ({tag.count})
      </Tag>
  )
}

export default PersonalityTag