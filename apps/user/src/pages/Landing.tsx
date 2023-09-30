import React from "react";
import { Card } from "ui";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { queryState } from "recoil-state";
import "./landing.css";

// import bleach from "../assets/bleach.jpg";
// import ulquiorra from "../assets/ulquiorra.jpg";
export const Landing: React.FC = () => {
  const setQuery = useSetRecoilState(queryState);
  return (
    // stop overflow on landing page card container div have right padding 10px
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <section
        className={"section-grid"}
        style={{
          gridTemplate: "33vw / repeat(12, 1fr)",
          marginBottom: "1.22222vw",
        }}
      >
        <Link
          to="/store"
          style={{ gridColumn: "1/13", height: "31vw", position: "relative" }}
          className="dark-card"
          onClick={() => {
            setQuery({});
          }}
        >
          <Card
            img={"https://i.ibb.co/689qL6r/cover0-3.png"}
            rest={{ width: "100%", height: "33vw" }}
          />
          <div className="card-info-container">
            <div className="card-info">
              <div className="info-heading">Browse manga</div>
              <div className="info-details">50% OFF ON HUNDREDS OF BOOKS</div>
              <div className="info-price">Starting from ₹500</div>
            </div>
          </div>
          {/* rest={{ gridColumn: "1/13" }} */}
        </Link>
      </section>
      <section
        className={"section-grid"}
        style={{
          gridTemplate: "33vw / repeat(12, 1fr)",
          marginBottom: "1.22222vw",
        }}
      >
        <Link
          to="/store/64d3dc4f3513fc7427ea5c79"
          style={{ gridColumn: "1/13", height: "31vw", position: "relative" }}
        >
          <Card
            img={
              "https://r4.wallpaperflare.com/wallpaper/823/1023/805/son-goku-anime-saiyan-dragon-ball-z-digital-art-hd-wallpaper-e8d69d883020ec0820dc916e8842b40a.jpg"
            }
            rest={{ width: "100%", height: "33vw" }}
          />
          <div className="card-info-container">
            <div className="card-info">
              <div className="info-heading">Dragon Ball Super, Vol. 13</div>
              <div className="info-details">
                English, Paperback, Toriyama Akira
              </div>
              <div className="info-price">
                From ₹1020{" "}
                <del style={{ fontSize: 14, opacity: 0.5 }}>₹1500</del>
              </div>
            </div>
          </div>
          {/* rest={{ gridColumn: "1/13" }} */}
        </Link>
      </section>

      <section
        className={"section-grid"}
        style={{
          margin: "1.22222vw",
          marginBottom: 0,
          gap: "1.22222vw",
        }}
      >
        <Card
          img={
            "https://i03.appmifile.com/107_operator_in/04/08/2023/c94ac6976ad0718c75ca582867642231.jpg?f=webp"
          }
          rest={{ gridColumn: "1/7" }}
        />
        <Card
          img={
            "https://i03.appmifile.com/336_operator_in/03/08/2023/08ddaa41ff0613a34b9c49743437e01b.jpg?f=webp"
          }
          rest={{ gridColumn: "7/13" }}
        />
      </section>
      <section
        className={"section-grid"}
        style={{
          margin: "1.22222vw",
          gap: ".78125vw",
        }}
      >
        <Card
          img={
            "https://i03.appmifile.com/549_operator_in/01/08/2023/9bef0fa60660f25faeadebccf75cb4a4.jpg?f=webp"
          }
          rest={{ gridColumn: "1/7" }}
        />
        <Card
          img={
            "https://i03.appmifile.com/752_operator_in/16/02/2023/9ba4de496b2585d836d867ae79b6d8f0.jpg?f=webp"
          }
          rest={{ gridColumn: "7/10" }}
        />
        <Card
          img={
            "https://i03.appmifile.com/752_operator_in/16/02/2023/9ba4de496b2585d836d867ae79b6d8f0.jpg?f=webp"
          }
          rest={{ gridColumn: "10/13" }}
        />
      </section>
    </div>
  );
};

// export default Landing;
