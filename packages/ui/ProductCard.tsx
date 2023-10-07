import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";

export const ProductCard: React.FC<{
  _id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  rest?: any;
}> = ({ img, name, description, price, _id, rest }) => {
  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: ".6rem",
        margin: 0,
        width: "18vw",
        height: "32vw",
        overflow: "hidden",
        ...rest,
      }}
    >
      <Link to={`/store/${_id}`} style={{minWidth: "100%"}}>
        <div style={{ minHeight: "25vw", minWidth: "100%"}}>
          <img
            src={img}
            alt="yede"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              minHeight: "80%",
              margin: 0,
              maxHeight: "340px" 
            }}
          />
        </div>
      </Link>
      <Link
        to={`/store/${_id}`}
        className="productCard-title"
        style={{
          width: "100%",
        }}
      >
        {name}
      </Link>
      <p
        className="productCard-description"
        style={{
          width: "100%",
        }}
      >
        {description}
      </p>
      <Link to={`/store/${_id}`} className="productCard-price">
        ₹{price}
      </Link>
    </div>
  );
};
