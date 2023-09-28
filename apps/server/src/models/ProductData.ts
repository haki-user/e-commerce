import mongoose, { Document, Schema } from "mongoose";

export interface IProductData extends Document {
  name: string;
  description: string;
  price: number;
  img: string;
  images?: string[];
  specs?: string[];
  category?: string;
}

const productDataSchema = new Schema<IProductData>({
  name: { type: String, required: true },
  description: { type: String, requried: true },
  specs: { type: [String], required: false },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  images: { type: [String], required: false },
  category: { type: String, required: false },
});

const ProductData = mongoose.model<IProductData>(
  "ProductData",
  productDataSchema
);

export default ProductData;
