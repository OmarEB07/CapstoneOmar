import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    errorMessage: "", // Add an errorMessage field to your initialState
    notification: null, // Correct placement inside initialState
  },
  reducers: {
     // notifications
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },

    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to fetch products"; // Example adjustment
    },
    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      state.notification = { type: 'success', message: 'Product deleted successfully!' };

    },
    deleteProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to delete product"; 
      state.notification = { type: 'error', message: 'Deleting Product Failed!' };
      // Example adjustment
    },
    //UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
      state.notification = { type: 'success', message: 'Product updated successfully!' };

    },
    updateProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "Failed to update product"; // Example adjustment
      state.notification = { type: 'error', message: 'Updating Product Failed!' };

    },
    //ADD
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      state.notification = { type: 'success', message: 'Product added successfully!' };
    },
    addProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload; // Store the error message
      state.notification = { type: 'error', message: 'Add Product Failed!' };
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  setNotification,
} = productSlice.actions;

export default productSlice.reducer;
