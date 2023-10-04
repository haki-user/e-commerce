import React from "react";
import "./toggleBox.css";

let id = Math.random() * 1000;

export const ToggleBox: React.FC<{
  children?: React.ReactNode;
  text: string;
}> = (props) => {
  const _id = id++ + "" + Date.now();
  const { children, text } = props;

  return (
    <div style={{ margin: 8 }}>
      <input className="toggle-box" id={`${_id}`} type="checkbox" />
      <label htmlFor={`${_id}`}>{text}</label>
      <div className="expand-container">{children}</div>
    </div>
  );
};
