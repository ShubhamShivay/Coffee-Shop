import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BrandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const category = mongoose.model("Category", BrandSchema);

export default category