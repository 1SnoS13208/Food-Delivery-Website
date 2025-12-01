import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://greatstack:hoitinhnghich%40123@cluster0.32be1o3.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
