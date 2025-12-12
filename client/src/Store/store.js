import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../Features/UserSlice";
import productsReducer from "../Features/AddProductSlice";
import cartReducer from "../Features/CartSlice";
import orderReducer from '../Features/OrderSlice';


export const store = configureStore({
  reducer: {
    users:usersReducer,
    products:productsReducer,
    cart:cartReducer,
    order:orderReducer
    
  },
})
