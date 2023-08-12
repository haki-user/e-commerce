"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = async (userId) => {
    const cart = await Cart_1.default.findOne({ user: userId }).populate("items.product", "name price");
    return cart?.items || [];
};
exports.getCart = getCart;
const addToCart = async (userId, product, quantity) => {
    try {
        const cart = await Cart_1.default.findOneAndUpdate({ user: userId, "items.product": product }, // Find the cart with the specified user and matching product
        {
            $set: { "items.$.quantity": quantity }, // Update the quantity of the matching product
        }, { new: true }).populate("items.product", "name price");
        if (!cart) {
            // If cart doesn't exist, create a new one
            const newCart = new Cart_1.default({
                user: userId,
                items: [{ product, quantity }],
            });
            await newCart.save();
        }
        return cart?.items || [];
    }
    catch (e) {
        console.log(e);
        return [];
    }
};
exports.addToCart = addToCart;
