import mongoose from "mongoose";
import dotenv from "dotenv";
// import ProductData from "../models/ProductData";
// import Product from "../models/Product"

dotenv.config();

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  console.error("Mongo uri missing");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // const productsData = await Product.find({});
    // for (const product of productsData) {
    //   const { _id, name, price, img } = product;
    //   const description = ''; // You can set it to an empty string

      // Create a new document in "productdatas"
      // await ProductData.insertOne({ _id, name, price, img, description });
    // }

    // console.log('Data copied and transformed successfully.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default connectDB;
