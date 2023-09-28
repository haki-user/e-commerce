import { Request, Response } from "express";
import { getCart, addToCart } from "../services/cart";

export const getCartController = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const cart = await getCart(userId);
  res.json({ cart });
};

export const addToCartController = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { product, quantity } = req.body;
  const cart = await addToCart(userId, product, quantity);
  res.json({ cart });
};
