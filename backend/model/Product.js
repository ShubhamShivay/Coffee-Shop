import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg",
    },
    brand: {
      type: String,
      required: true,
      default: "no brand",
      ref: "Brand",
    },
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
