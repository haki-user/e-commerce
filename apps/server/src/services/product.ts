import Product, { IProduct } from "../models/Product";
import ProductData, { IProductData } from "../models/ProductData";

export const createProduct = async (product: IProduct): Promise<IProduct> => {
  return await Product.create(product);
};

export const updateProduct = async (
  productId: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findOneAndUpdate({ _id: productId }, productData, {
    new: true,
  });
};

export const deleteProduct = async (
  productId: string
): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(productId);
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductById = async (
  productId: string
): Promise<IProductData | null> => {
  return await ProductData.findById(productId);
};

export const createProductData = async (
  productData: IProductData
): Promise<IProductData> => {
  return await ProductData.create(productData);
};

export const getBySearchQuery = async ({
  name,
  categories,
  language,
  min,
  max,
}: {
  name?: string;
  categories?: string;
  language?: string;
  min?: number;
  max?: number;
}): Promise<IProduct[]> => {
  try {
    let query: any = {};
    if (name) {
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query["name"] = { $regex: escapedName, $options: "i" };
    }
    if (categories) {
      query["category"] = new RegExp(categories.split(",").join("|"), "i");
    }
    if (language) {
      query["language"] = new RegExp(language.split(",").join("|"), "i");
    }
    if (min && max) query["price"] = { $lte: max, $gte: min };
    else if (min) query["price"] = { $gte: min };
    else if (max) query["price"] = { $lte: max };
    const products = await Product.find(query);
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSuggestionsByName = async (query: string): Promise<string[]> => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          name: {
            $regex: query,
            $options: "i",
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          // score: {
          //   $indexOfCP: ["$name", query],
          // },
        },
      },
      {
        $sort: {
          score: 1,
        },
      },
    ]);
    // console.log(query, suggestions);
    // console.log("ers", result)
    const withScore = result.map((item) => {return {name: item.name, score: item.name.indexOf(query)}});
    // console.log("lo",withScore)
    const suggestions = withScore.sort((a, b) => a.score - b.score).map((product) => product.name);
    // console.log("sug", suggestions)
    return suggestions.splice(0, 5);
  } catch (e) {
    console.error(e);
    return [];
  }
};
