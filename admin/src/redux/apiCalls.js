import { 
  clearNotification,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,} 
  from "./userRedux";

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

import {
  getCompaniesStart,
  getCompaniesSuccess,
  getCompaniesFailure,
  addCompanyStart,
  addCompanySuccess,
  addCompanyFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
  setNotificationcompany
} from "./companyRedux";


// Adding a Company
export const addCompany = (companyData, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(addCompanyStart());
    userRequest.post("/companies", companyData)
      .then(response => {
        dispatch(addCompanySuccess(response.data));
        dispatch(setNotificationcompany({ type: 'success', message: 'Company added successfully!' }));
        resolve(response.data);
      })
      .catch(error => {
        dispatch(addCompanyFailure());
        const errorMsg = error.response?.data.message || 'Failed to add company';
        dispatch(setNotificationcompany({ type: 'error', message: errorMsg }));
        reject(errorMsg);
      });
  });
};
// Updating a Company
export const updateCompany = async (id, companyData, dispatch) => {
  dispatch(updateCompanyStart());
  try {
    const res = await userRequest.put(`/companies/${id}`, companyData);
    dispatch(updateCompanySuccess(res.data));
    dispatch(setNotificationcompany({ type: 'success', message: 'Company updated successfully!' }));
    return { success: true, data: res.data }; // Return success status and data
  } catch (error) {
    dispatch(updateCompanyFailure());
    dispatch(setNotificationcompany({ type: 'error', message: error.response.data.message || 'Failed to update company' }));
    return { success: false, error: error.response.data.message || 'Failed to update company' }; // Return failure status and error message
  }
};

// Deleting a Company
export const deleteCompany = async (id, dispatch) => {
  dispatch(deleteCompanyStart());
  try {
    await userRequest.delete(`/companies/${id}`);
    dispatch(deleteCompanySuccess(id));
    dispatch(setNotificationcompany({ type: 'success', message: 'Company deleted successfully!' }));
    return { success: true };  // Ensure this line exists
  } catch (error) {
    dispatch(deleteCompanyFailure());
    dispatch(setNotificationcompany({ type: 'error', message: error.response.data.message || 'Failed to delete company' }));
    return { success: false }; // Ensure this line exists
  }
};

// Fetching Companies
export const getCompanies = () => async (dispatch) => {
  dispatch(getCompaniesStart());
  try {
    const res = await userRequest.get("/companies");
    if (res.status === 200) {
      dispatch(getCompaniesSuccess(res.data));
    } else {
      throw new Error('Failed to fetch companies');
    }
  } catch (error) {
    dispatch(getCompaniesFailure(error.toString()));
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
      const res = await publicRequest.post("/auth/adminlogin", user);
      if (res.status === 200) {
          dispatch(loginSuccess(res.data));
      }
  } catch (error) {
      dispatch(loginFailure());
      throw error.response.data;  // Ensure error details are thrown to be catchable
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
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

export const getUsers = () => async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
    console.error("Failed to fetch users:", err);
  }
};


export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
    dispatch(setNotification({ type: 'success', message: 'User deleted successfully!' }));
  } catch (err) {
    dispatch(deleteUserFailure());
    const errorMessage = err.response?.data?.message || "Failed to delete user";
    dispatch(setNotification({ type: 'error', message: errorMessage }));
  }
};

export const updateUser = async (id, userData, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, userData);
    dispatch(updateUserSuccess(res.data));
    dispatch(setNotification({ type: 'success', message: 'User updated successfully!' }));
  } catch (err) {
    dispatch(updateUserFailure());
    const errorMessage = err.response?.data?.message || "Failed to update user";
    dispatch(setNotification({ type: 'error', message: errorMessage }));
  }
};


export const getUserDetails = async (id, dispatch) => {
  dispatch(getUsersStart());
  try {
      const res = await userRequest.get(`/users/find/${id}`);
      dispatch(getUsersSuccess([res.data])); // Assuming the backend returns a single user object, wrap it in an array for consistency with your existing state management.
  } catch (err) {
      dispatch(getUsersFailure(err.response?.data?.message || "Failed to fetch user details"));
  }
};