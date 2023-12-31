import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { useRecoilState } from "recoil";
import { queryState } from "recoil-state";
import { ProductCard, SnackbarType, useSnackbar } from "ui";
import { Filters } from "../components/Filters";
import "./store.css";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  img: string;
};

let source: CancelTokenSource;

type sortType = "lt" | "gt" | "relavance";

export const Store: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const { showSnackbar } = useSnackbar();
  const [query, setQuery] = useRecoilState(queryState);
  const [sort, setSort] = useState<sortType>("relavance");
  const search = useParams();

  const fetchData = async () => {
    try {
      console.log("fetching");
      if (source) source.cancel();
      source = axios.CancelToken.source();
      console.log(query, sort);
      setIsLoading(true);
      const res = await axios.get("/products/search", {
        params: query,
        cancelToken: source.token,
      });

      console.log("fetched", res.data.products);
      if (res.status == 200) setData(res.data.products);
      setIsLoading(false);
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log("Request canceled", e.message);
        return;
      } else if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<{ message: string }>;
        showSnackbar(
          SnackbarType.ERROR,
          axiosError.response?.data.message || axiosError.message
        );
        setIsLoading(false);
        return;
      }
      console.error(e);
    }
    // finally {
    //   console.log("set false");
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    if (search && search.name !== query.name) {
      setQuery((prev) => ({
        ...prev,
        name: search.name as string,
      }));
      return;
    }
    if (sort !== "relavance") {
      setSort("relavance");
      return;
    }
    fetchData();

    return () => {
      if (source) source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, search]);

  useEffect(() => {
    if (sort === "relavance") {
      fetchData();

      return () => {
        if (source) source.cancel();
      };
    } else if (sort === "lt") {
      setData((prev) => {
        return [...prev].sort((a, b) => a.price - b.price);
      });
    } else if (sort === "gt") {
      setData((prev) => {
        return [...prev].sort((a, b) => b.price - a.price);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <div
      className="store-container"
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <section
        className="filters-section"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1.22222vw",
          marginRight: 0,
          flexBasis: 350,
          maxWidth: 280,
          // height: 100,
        }}
      >
        <Filters sort={sort} setSort={setSort} />
      </section>
      <section
        className="productCard-section"
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

        {!isLoading && data.length === 0 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FCFEFC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              textAlign: "center",
            }}
          >
            Nothing to show <br />
            Try Searching One Piece
          </div>
        ) : isLoading || data.length === 0 ? (
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
              <ProductCard
                key={idx}
                _id={_id}
                img={img}
                name={name}
                description={description}
                price={price}
                rest={{ minWidth: "245px", minHeight: "437px" }}
              />
            );
          })
        )}
      </section>
    </div>
  );
};
