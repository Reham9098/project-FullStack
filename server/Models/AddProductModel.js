import mongoose from "mongoose";

const AddProductSchema = mongoose.Schema({
  productCode: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productDiscribtion: {
    type: String,
    required: true,
  },  
  productImage: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },


  likes: {
    count: { type: Number, default: 0 },
    users: { type: [String], default: [] }
  },

  
  
 },
  {
    timestamps: true
  }
);

const PostModel = mongoose.model("products", AddProductSchema);

export default PostModel;
