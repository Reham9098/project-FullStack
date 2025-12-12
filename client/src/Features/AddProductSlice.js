import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/savePost`, {
export const AddProduct = createAsyncThunk("products/AddProduct", async (productData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/AddProduct`, {
        productCode: productData.productCode,
        productName: productData.productName,
        productPrice: productData.productPrice,
        productQuantity: productData.productQuantity,
        productDiscribtion: productData.productDiscribtion,
        productImage: productData.productImage,
        productCategory: productData.productCategory,
        email: productData.email,
    
      //postMsg: postData.postMsg,
      //email: postData.email,
    });
    const product = response.data.product;
    return product; //Return the new post to Redux
  } catch (error) {
    console.log(error);
  }
});

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getProducts`);
    return response.data.products;
   } catch (error) {
    console.log(error);
  }
});



export const likeProduct = createAsyncThunk("products/likeProduct", async (productData) => {
  try {
    //Pass along the URL the productId
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/likeProduct/${productData.productId}`,
      {
        userId: productData.userId,
      }
    );
    const product = response.data.product;
    return product;
  } catch (error) {
    console.log(error);
  }
});

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteProduct/${productId}`);
    return productId; // return ID so we can remove it from the state
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, updatedData }) => {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/updateProduct/${productId}`, updatedData);
    return response.data.product;
  }
);






const initialState = {
  status: "idle",
  products: [],
  comments: [],
  likes: [],
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        // Update the state with fetched products adding the latest product in the beginning
        state.products.unshift(action.payload);
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the state with fetched products
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })




      .addCase(likeProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
              //Search the product id from the products state
        const updatedProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
            
             //If found, update the likes property of the found product to the current value of the likes
        if (updatedProductIndex !== -1) {
        state.products[updatedProductIndex].likes = action.payload.likes;
        }
      })
      .addCase(likeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
       state.products = state.products.filter(
       (product) => product._id !== action.payload
      )})
      

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
        state.products[index] = action.payload;
      }
      });

      


  },
});
export default productSlice.reducer;