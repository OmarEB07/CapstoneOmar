import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethods";

// Helper function for sale price calculation
function calculateSalePrice(price, salePercentage) {
  return price * (1 - salePercentage); // Ensure this rounds as needed
}

// Async thunk for adding a product to the cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ userId, productDetails }, { rejectWithValue }) => {
    try {
      // Calculate the sale price if on sale and include it in productDetails
      if (productDetails.onSale) {
        productDetails.salePrice = calculateSalePrice(productDetails.price, productDetails.salePercentage);
      }

      const response = await userRequest.post("/carts", {
        userId,
        products: [{ ...productDetails }]
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await userRequest.put(`/carts/${userId}/remove`, { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart', 
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const response = await userRequest.get(`/carts/find/${userId}`);
      console.log('Server response:', response); // Log the server response to debug
      dispatch(cartActions.setCart(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userRequest.delete(`/carts/${userId}`);
      return response.data;  // Should return a success message or similar confirmation
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [], quantity: 0, total: 0, loading: false, error: null },
  reducers: {
    clearCart: state => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    setCart: (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.products.reduce((acc, product) => {
        // Check if the product is on sale and use the sale price if so
        const effectivePrice = product.onSale
          ? product.price * (1 - product.salePercentage)
          : product.price;
        return acc + effectivePrice * product.quantity;
      }, 0);
      state.quantity = action.payload.products.length;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total = action.payload.products.reduce((acc, curr) => {
        const effectivePrice = curr.onSale ?( 1 -curr.salePercentage)*curr.price : curr.price;
        return acc + effectivePrice * curr.quantity;
      }, 0);
      state.quantity = action.payload.products.length;
    })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.products.reduce((acc, curr) => {
          const effectivePrice = curr.onSale ? (1-curr.salePercentage)*curr.price : curr.price;
          return acc + effectivePrice * curr.quantity;
        }, 0);
        state.quantity = action.payload.products.length;
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.products = [];
        state.total = 0;
        state.quantity = 0;
      });
  }
});

// Consolidate all actions under a single exported object
export const cartActions = {
  ...cartSlice.actions,
  addProductToCart,
  removeProductFromCart,
  fetchCart,
  clearUserCart
};

export default cartSlice.reducer;
