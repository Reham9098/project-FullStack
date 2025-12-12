import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 },
    }
  ],
}, { timestamps: true });

const CartModel = mongoose.model("carts", CartSchema);
export default CartModel;
