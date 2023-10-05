import React from "react";

let id = Math.random() * 1000;

export const InputOption: React.FC<{ text: string; callBack: () => void }> = ({
  text,
  callBack,
}) => {
  const _id = id++ + "" + Date.now();
  return (
    <div style={{ margin: 4, display: "flex" }}>
      <input
        id={_id}
        type="checkbox"
        className="cursor-pointer"
        onClick={callBack}
      />
      <label
        htmlFor={_id}
        style={{ paddingLeft: 8, fontSize: 14 }}
        className="cursor-pointer"
      >
        {text}
      </label>
    </div>
  );
};
