import React from "react";

export const InputOption: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ margin: 4, display: "flex" }}>
      <div>
        <input type="checkbox" />
      </div>
      <div style={{ paddingLeft: 8, fontSize: 14 }}>{text}</div>
    </div>
  );
};
