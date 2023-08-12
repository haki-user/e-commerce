import React from "react";
import { Card } from "ui";
// import bleach from "../assets/bleach.jpg";
// import ulquiorra from "../assets/ulquiorra.jpg";
export const Landing: React.FC = () => {
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
      {/* <h1>Landing</h1> */}
      {/* <Card img="https://picsum.photos/200/300" title="Product 1" description="This is product 1" /> */}
      <section
        className={'section-grid'}
        style={{
          gridTemplate: "33vw / repeat(12, 1fr)",
          marginBottom: "1.22222vw",
        }}
      >
        <Card
          img={
            "https://r4.wallpaperflare.com/wallpaper/214/442/543/digital-art-son-goku-dragon-ball-dragon-ball-z-island-hd-wallpaper-7fe592ecce46cc0b25cc6832f1912434.jpg"
          }
          
          rest={{ gridColumn: "1/13" }}
        />
      </section>
      <section
        className={'section-grid'}
        style={{
          gridTemplate: "33vw / repeat(12, 1fr)",
          margin: 0,
          marginBottom: "1.22222vw",
        }}
      >
        <Card
          img={
            "https://r4.wallpaperflare.com/wallpaper/440/217/250/skull-and-bones-2018-video-game-wallpaper-e88596fa7c7fcaf5772dc7dc816897b9.jpg"
          }
          text={{"title":"Product 1",
          "description":"This is product 1",
          "textClass":" "
        }}
          rest={{ gridColumn: "1/13" }}
        />
      </section>
      <section
        className={'section-grid'}
        style={{
          gridTemplate: "33vw / repeat(12, 1fr)",
          margin: 0
        }}
      >
        <Card
          img={
            "https://i03.appmifile.com/643_operator_in/04/08/2023/4ab685e0d335e81b251ef9dd61add2b1.jpg?f=webp"
          }
          
          rest={{ gridColumn: "1/13" }}
        />
      </section>
      <section
        className={'section-grid'}
        style={{
          margin: "1.22222vw",
          marginBottom: 0,
          gap: "1.22222vw",
        }}
      >
        {/* <Card
            img={bleach}
            title="Product 1"
            description="This is product 1"
            rest={{
            }}
            />
            <Card
            img={ulquiorra}
            title="Product 1"
            description="This is product 1"
            /> */}

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
        className={'section-grid'}
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
