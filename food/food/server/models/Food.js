import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    fid: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    Image: { type: String, default: null },
    price:Number,
    Rating: Number,
  },

);

export default mongoose.model("Food", FoodSchema);
