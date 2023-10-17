import React from "react";
import { Card, WideCard } from "ui";
// import { Link } from "react-router-dom";
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
      <WideCard
        to="store"
        img="https://i.ibb.co/689qL6r/cover0-3.png"
        title="Browse manga"
        description="50% OFF ON HUNDREDS OF BOOKS"
        price="Starting from ₹500"
        containerClass="dark-card"
        dark={true}
        onClick={() => {
          setQuery({});
        }}
      />
      <WideCard
        to="/store/product/64d3dc4f3513fc7427ea5c79"
        img="https://r4.wallpaperflare.com/wallpaper/823/1023/805/son-goku-anime-saiyan-dragon-ball-z-digital-art-hd-wallpaper-e8d69d883020ec0820dc916e8842b40a.jpg"
        title="Dragon Ball Super, Vol. 13"
        description="English, Paperback, Toriyama Akira"
        price="From ₹1020"
        prevPrice="1500"
      />

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
            // "https://mangaonelove.site/wp-content/uploads/WP-manga/data/manga_60ce578aea8e2/037dd1c321a53a99209cc0a368e8db9f/3.jpeg"
            // "https://i.ebayimg.com/images/g/n6IAAOSwZH5gEksK/s-l1600.jpg"
            // "https://djm-aaa1.kxcdn.com/resources/upload/products/81u9pR6zMsL._AC_SL1500_.jpg"
            // "https://steamuserimages-a.akamaihd.net/ugc/1705161986723884743/3DE85FC1F4330320E015F6582D4DFCA4F2A481AF/?imw=512&amp;imh=367&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true"
            // "https://mangaonelove.site/wp-content/uploads/WP-manga/data/manga_60ce578aea8e2/037dd1c321a53a99209cc0a368e8db9f/3.jpeg"
            "https://glculturetree.files.wordpress.com/2017/05/initial_d_movie_2014_site.png"
          }
          // dark={true}
          // text={{ title: "Initial D", description: "Tobirama, paperblack, " }}
          rest={{ gridColumn: "1/7" }}
        />
        <Card
          img={
            // "https://iili.io/JFGPWtj.jpg"
            "https://i.pinimg.com/originals/4e/4c/c8/4e4cc810f2b222adb06680b2d8ce433c.jpg"
          }
          // dark={true}
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
          img={"https://wallpapercave.com/wp/wp2610317.jpg"}
          rest={{ gridColumn: "1/7" }}
        />
        <Card
          img={
            "https://rukminim1.flixcart.com/image/850/1000/l2z26q80/poster/r/n/f/medium-vagabond-manga-anime-series-hd-matte-finish-poster-original-image6xzmaywssfg.jpeg?q=90"
          }
          rest={{ gridColumn: "7/10" }}
        />
        <Card
          img={
            "https://m.media-amazon.com/images/I/718CuMByftL._AC_UF1000,1000_QL80_.jpg"
          }
          rest={{ gridColumn: "10/13" }}
        />
      </section>
      <footer className="landing-footer">
        <p style={{ color: "white" }}>
          About{" "}
          <span>
            <img src="https://w7.pngwing.com/pngs/914/758/png-transparent-github-social-media-computer-icons-logo-android-github-logo-computer-wallpaper-banner-thumbnail.png" />
            <a href="https://github.com/haki-user/e-commerce" target="_blank" rel="noopener noreferrer">Github</a>
          </span>
        </p>
      </footer>
    </div>
  );
};

// export default Landing;
