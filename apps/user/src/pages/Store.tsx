import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilValue } from "recoil";
import { queryState } from "recoil-state";
import { ProductCard, SnackbarType, useSnackbar } from "ui";
import { Filters } from "../components/Filters";

export const Store: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { showSnackbar } = useSnackbar();
  const query = useRecoilValue(queryState);

  const fetchData = async () => {
    try {
      // console.log(query);
      const res = await axios.get("/products/search", {
        params: query,
      });
      if (res.status == 200) setData(res.data.products);
      // console.log(res.data.products);
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
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
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
          height: 100,
        }}
      >
        <Filters />
      </section>
      <section
        style={{
          width: "100%",
          height: "100%",
          margin: "1.2222vw",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          overflow: "scroll",
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

        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FCFEFC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
            }}
          >
            <img
              src={"https://media.tenor.com/pHoLtiJJRYgAAAAC/zoro-run.gif"}
              alt="loading"
              style={{ width: "12vw" }}
            />
          </div>
        ) : (
          data.map(({ _id, img, name, description, price }, idx) => {
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
                rest={{ minWidth: "245px", minHeight: "437px" }}
              />
              // </Link>
            );
          })
        )}
      </section>
    </div>
  );
};
