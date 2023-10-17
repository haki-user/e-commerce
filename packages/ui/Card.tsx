import React from "react";
import "./card.css";

export const Card: React.FC<{
  text?: { title: string; textClass?: string; description: string };
  img: string;
  dark?: boolean;
  rest?: any;
}> = ({ text, img, dark, rest = { width: "47vw", height: "31vw" } }) => {
  const { title, textClass, description } = {
    title: "",
    textClass: " ",
    description: "",
    ...text,
  };
  console.log(title);
  // console.log(rest);
  // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",

  return (
    <div
      className={`card ${dark ? "dark-card" : ""}`}
      style={{
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        ...rest,
      }}
    >
      <img
        src={img}
        className={`${dark ? "dark-" : ""}card-img`}
        alt="..."
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
      />
      <div className={`card-text${dark ? "-dark" : ""}`}>
        <h1 className="card-title" style={{}}>
          {title}
        </h1>
        <p className="card-description" style={{}}>
          {description}
        </p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
};
