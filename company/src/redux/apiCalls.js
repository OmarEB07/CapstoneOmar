
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  setNotification, // Import the setNotification action
} from "./productRedux";









export const getProducts = async (dispatch, companyId = '') => {
  dispatch(getProductStart());
  try {
      const res = await userRequest.get(`/products?companyId=${companyId}`);
      dispatch(getProductSuccess(res.data));
  } catch (err) {
      dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
    dispatch(setNotification({ type: 'success', message: 'Product deleted successfully!' })); // Set success notification
    return { success: true }; // Indicate success
  } catch (err) {
    dispatch(deleteProductFailure());
    dispatch(setNotification({ type: 'error', message: 'Deleting Product Failed!' })); // Set error notification
    return { success: false }; // Indicate failure

    
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product: res.data }));
    dispatch(setNotification({ type: 'success', message: 'Product updated successfully!' })); // Set success notification
    return { success: true, product: res.data };
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Failed to update product";
    dispatch(updateProductFailure(errorMessage));
    dispatch(setNotification({ type: 'error', message: errorMessage })); // Set error notification
    return { success: false, error: errorMessage };
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
    dispatch(setNotification({ type: 'success', message: 'Product added successfully!' })); // Set success notification
    return { success: true, product: res.data };
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Failed to add product";
    dispatch(addProductFailure(errorMessage));
    dispatch(setNotification({ type: 'error', message: errorMessage })); // Set error notification
    return { success: false, error: errorMessage };
  }
};

