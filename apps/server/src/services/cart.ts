import Cart, { ICartItem } from "../models/Cart";

export const getCart = async (userId: string): Promise<ICartItem[]> => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price"
  );
  return cart?.items || [];
};

export const addToCart = async (
  userId: string,
  product: string,
  quantity: number
): Promise<ICartItem[]> => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId, "items.product": product }, // Find the cart with the specified user and matching product
      {
        $set: { "items.$.quantity": quantity }, // Update the quantity of the matching product
      },
      { new: true }
    ).populate("items.product", "name price");
    
    if (!cart) {
      // If cart doesn't exist, create a new one
      const newCart = new Cart({
        user: userId,
        items: [{ product, quantity }],
      });
      await newCart.save();
    }
    
    return cart?.items || [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

