import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "recoil-state";
import axios, { AxiosError } from "axios";
import { SnackbarType } from "ui/Snackbar";
import { useSnackbar } from "ui";
import "./productPage.css";

interface Product {
  img: string;
  name: string;
  description: string;
  specs?: string;
  price: number;
}

export const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    img: "",
    name: "",
    description: "",
    price: 0,
  });
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          const axiosError = e as AxiosError<{ message: string }>;
          showSnackbar(
            SnackbarType.ERROR,
            axiosError.response?.data.message || axiosError.message
          );
          return;
        }
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const buy = async () => {
    if (!auth.username) {
      showSnackbar(SnackbarType.INFO, "Login to Purchase");
      navigate("/login");
      return;
    }
    console.log("purchased");
    showSnackbar(SnackbarType.SUCCESS, "Purchased");
  };

  const addToCart = async () => {
    if (!auth.username) {
      showSnackbar(SnackbarType.INFO, "Login to Add");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post("/cart", {
        product,
        quantity: 1,
      });
      if (res.status != 200) {
        return console.log("Not cart");
      }
      console.log("cart added");
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

  return (
    <div
      className="productPage"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <section
        className="main"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <section
          className="left"
          style={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="img"
            style={{
              width: "355px",
              height: "450px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem",
              border: "1px solid rgb(0,0,0,0.1)",
            }}
          >
            <img
              src={product.img}
              alt="yede"
              style={{
                width: "277px",
                height: "416px",
                objectFit: "fill",
                minHeight: "80%",
                margin: 0,
              }}
            />
          </div>
          <div
            style={{
              paddingLeft: "1rem",
            }}
          >
            <h2
              style={{
                margin: "10px",
              }}
            >
              ₹{product.price}
            </h2>
            {
              <button className="cart-button" onClick={addToCart}>
                ADD TO CART
              </button>
            }
            <button className="buy-button" onClick={buy}>
              BUY NOW
            </button>
          </div>
        </section>
        <div
          className="details"
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <h1>{product.name}</h1>
          <div
            className="product-description"
            style={{
              width: "800px",
              height: "max-content",
              maxHeight: "400px",
              display: "flex",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                paddingRight: "1rem",
              }}
            >
              <p
                style={{
                  fontWeight: "500",
                  color: "rgb(135, 135, 135)",
                  fontSize: "14px",
                }}
              >
                Description
              </p>
            </div>
            <div
              style={{
                width: 677,
                maxHeight: "400px",
              }}
            >
              <p className="product-description-text">{product.description}</p>
            </div>
          </div>
          <div
            className="specs"
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <div
              className="product-specification"
              style={{
                width: "800px",
                height: "max-content",
                maxHeight: "400px",
                display: "flex",
                marginBottom: "5px",
              }}
            >
              <div
                style={{
                  paddingRight: "1rem",
                }}
              >
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: 20,
                  }}
                >
                  Specifications
                </p>
              </div>
              <div
                style={{
                  width: 677,
                  maxHeight: "400px",
                }}
              >
                <p className="product-specification-text">{product.specs}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
};
