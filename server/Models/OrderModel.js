import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true }, // e.g., "COD" or "Card"
  cardDetails: {
    type: {
      cardType: String,
      cardholderName: String,
      cardNumber: String,
      expiryDate: String,
      cvv: String,
    },
    required: false
  },
  products: [
    {
      code: String,
      name: String,
      image: String,
      quantity: Number
    }
  ],
  totalItems: { type: Number },
  orderTotal: { type: Number }
}, { timestamps: true });


const OrderModel = mongoose.model("orders", OrderSchema);
export default OrderModel;
