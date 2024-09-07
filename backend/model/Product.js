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
      //   required: true,
    },
    brand: {
      type: String,
      required: true,
      default: "no brand",
      
      enum: ["no brand", "npple", "samsung", "google", "xiaomi", "huawei"],
    },
    category: {
      type: String,
      required: true,
      default: "no category",
      enum: ["no category", "food", "fruit", "vegitable", "drink", "others"],
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
