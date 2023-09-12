import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { ProductCard, SnackbarType, useSnackbar } from "ui";
// const data = [
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/xif0q/book/v/p/3/attack-on-titan-1-original-imagges7ddrfvuvn.jpeg?q=70  ",
//     title: "Attack On Titan 1  (English, Paperback, Isayama Hajime)",
//     description: "English, Paperback, Isayama Hajime",
//     price: 500,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/kpzt7680/book/6/w/j/one-punch-man-vol-23-original-imag43n4jv2hewdm.jpeg?q=70",
//     title: "One-Punch Man, Vol. 23",
//     description: "English, Paperback, ONE",
//     price: 500,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/xif0q/book/u/u/3/berserk-volume-1-original-imaggmzs4r8w9zd6.jpeg?q=70",
//     title: "Berserk Volume 1",
//     description: "English, Paperback, Miura Kentaro",
//     price: 500,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/xif0q/book/u/e/w/vinland-saga-1-original-imaggeryzfqngtta.jpeg?q=70",
//     title: "Vinland Saga 1",
//     description: "English, Paperback, Yukimura Makoto",
//     price: 500,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/kamtsi80/book/8/2/7/jujutsu-kaisen-vol-6-original-imafs5qvmpx3hrv4.jpeg?q=70",
//     title: "Jujutsu Kaisen, Vol. 6",
//     description: "English, Paperback, Akutami Gege",
//     price: 500,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/kf75fgw0/book/1/4/9/jujutsu-kaisen-0-original-imafvpf4jcspdf7b.jpeg?q=70",
//     title: "Jujutsu Kaisen 0",
//     description: "English, Paperback, Akutami Gege",
//     price: 433,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/ktvucnk0/book/p/c/y/jujutsu-kaisen-vol-14-original-imag74e5sfbpekmg.jpeg?q=70",
//     title: "Jujutsu Kaisen, Vol. 14",
//     description: "English, Paperback, Akutami Gege",
//     price: 433,
//   },
//   {
//     img: "https://rukminim2.flixcart.com/image/612/612/xif0q/book/y/m/k/jujutsu-kaisen-summer-of-ashes-autumn-of-dust-original-imagjyekfznryeuz.jpeg?q=70",
//     title: "Jujutsu Kaisen: Summer of Ashes, Autumn of Dust",
//     description: "English, Paperback, Kitaguni Ballad",
//     price: 649,
//   },
// ];
export const Store: React.FC = () => {
  const [data, setData] = useState([]);
  const { showSnackbar } = useSnackbar();

  const fetchData = async () => {
    try {
      const res = await axios.get("/products/");
      if (res.status == 200) setData(res.data.products);
      console.log(res.data.products);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<{ message: string }>;
        showSnackbar(
          SnackbarType.ERROR,
          axiosError.response?.data.message || axiosError.message
        );
        return;
      }
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1.22222vw",
          marginRight: 0,
          flexBasis: 350,
          maxWidth: 280,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%   ",
            backgroundColor: "white",
          }}
        ></div>
      </section>
      <section
        style={{
          width: "100%",
          height: "100%",
          margin: "1.2222vw",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {/* <ProductCard
          img={
            "https://rukminim2.flixcart.com/image/612/612/xif0q/book/v/p/3/attack-on-titan-1-original-imagges7ddrfvuvn.jpeg?q=70  "
          }
          title="Attack On Titan 1  (English, Paperback, Isayama Hajime)"
          description="English, Paperback, Isayama Hajime"
          price={500}
          rest={{ width: "100px" }}
        />
        <ProductCard
          img={
            "https://rukminim2.flixcart.com/image/612/612/kpzt7680/book/6/w/j/one-punch-man-vol-23-original-imag43n4jv2hewdm.jpeg?q=70"
          }
          title="One-Punch Man, Vol. 23"
          description="English, Paperback, ONE"
          price={500}
          rest={{ width: "100px" }}
        /> */}
        {data.map(({ _id, img, name, description, price }, idx) => {
          return (
            // <Link
            //   key={idx}
            //   to={`/store/${_id}`}
            //   style={{ textDecoration: "none", color: "inherit" }}
            // >
              <ProductCard
                key={idx}
                _id={_id}
                img={img}
                name={name}
                description={description}
                price={price}
              />
            // </Link>
          );
        })}
      </section>
    </div>
  );
};
