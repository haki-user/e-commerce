import Product, { IProduct } from '../models/Product';
import ProductData, { IProductData } from '../models/ProductData';

export const createProduct = async (product: IProduct): Promise<IProduct> => {
    return await Product.create(product);
}

export const updateProduct = async (productId: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findOneAndUpdate({ _id: productId }, productData, { new: true });
}

export const deleteProduct = async (productId: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(productId);
}

export const getAllProducts = async (): Promise<IProduct[]> => {
    return await Product.find();
}

export const getProductById = async (productId: string): Promise<IProductData | null> => {
    return await ProductData.findById(productId);
}

export const createProductData = async (productData: IProductData): Promise<IProductData> => {
    return await ProductData.create(productData);
}