import React from "react";
import { Link } from "react-router-dom";
import { Card } from "ui";
import "./wideCard.css";

export const WideCard: React.FC<{
  to: string;
  img: string;
  title: string;
  description: string;
  price: string;
  prevPrice?: string;
  containerClass?: string;
  onClick?: () => void;
  dark?: boolean;
  rest?: any;
}> = ({
  to = "#",
  price,
  img,
  title,
  description,
  containerClass,
  onClick,
  prevPrice,
  dark,
  rest,
}) => {
  return (
    <section
      className={"section-grid"}
      style={{
        gridTemplate: "33vw / repeat(12, 1fr)",
        marginBottom: "1.22222vw",
      }}
    >
      <Link
        to={to}
        style={{ gridColumn: "1/13", height: "31vw", position: "relative" }}
        className={containerClass}
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <Card img={img} dark={dark} rest={{ width: "100%", height: "33vw" }} />
        <div className="card-info-container">
          <div className="card-info">
            <div className="info-heading">{title}</div>
            <div className="info-details">{description}</div>
            <div className="info-price">
              {price}
              {prevPrice ? <del>₹{prevPrice}</del> : ""}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};
