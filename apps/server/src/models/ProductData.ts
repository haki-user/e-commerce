import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProductData extends Document {
  name: Types.ObjectId;
  price: Types.ObjectId;
  img: Types.ObjectId;
  description: string;
  specs?: string[];
  images?: string[];
  category?: string;
}

const productDataSchema = new Schema<IProductData>({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  description: { type: String, required: false },
  specs: { type: [String], required: false },
  images: { type: [String], required: false },
  category: { type: String, required: false },
});

const ProductData = mongoose.model<IProductData>(
  "ProductData",
  productDataSchema
);

export default ProductData;
