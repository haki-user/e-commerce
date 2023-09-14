import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getBySearchQuery,
} from "../services/product";

export const createProductController = async (req: Request, res: Response) => {
  const productData = req.body;
  if (!productData)
    return res.status(400).json({ error: "Product data is required" });
  if (!productData.name)
    return res.status(400).json({ error: "Product name is required" });
  if (!productData.price)
    return res.status(400).json({ error: "Product price is required" });
  if (!productData.description)
    return res.status(400).json({ error: "Product description is required" });
  if (!productData.image)
    return res.status(400).json({ error: "Product image is required" });

  const product = await createProduct(productData);
  res.json({ product, message: "Product created successfully" });
};

export const updateProductController = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const productData = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const updatedProduct = await updateProduct(productId, productData);
  if (!updatedProduct)
    return res.status(404).json({ error: "Product not found" });
  res.json({
    product: updatedProduct,
    message: "Product updated successfully",
  });
};

export const deleteProductController = async (req: Request, res: Response) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const deletedProduct = await deleteProduct(productId);
  if (!deletedProduct)
    return res.status(404).json({ error: "Product not found" });
  res.json({
    product: deletedProduct,
    message: "Product deleted successfully",
  });
};

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.json({ products });
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const product = await getProductById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ product });
};

export const getBySearchController = async (req: Request, res: Response) => {
  const { name, category } = req.query as { name?: string; category?: string };
  const price = req.query.price
    ? parseInt(req.query.price as string)
    : undefined;
  const products = await getBySearchQuery({ name, category, price });
  res.json({ products });
};
