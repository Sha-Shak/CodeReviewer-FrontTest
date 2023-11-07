import React from "react";

function CustomTooltip({ data}: any) {
  if (data) {
    console.log("tool tip",data)
   
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        <p>Name: {data.name}</p>
        <p>Marks: {data.hardSkillMarks}</p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
