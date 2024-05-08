import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { registerFailure, registerStart, registerSuccess } from "./userRedux";

export const login = (dispatch, user) => {
    dispatch(loginStart());
    return publicRequest
      .post("/auth/login", user)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        localStorage.setItem('token', res.data.accessTkn); // Store the token immediately upon login success
        console.log('Token saved after login:', localStorage.getItem('token')); // Debug: Check the stored token
        return res.data; // Return the user data for chaining if needed
      })
      .catch((err) => {
        dispatch(loginFailure());
        throw err;  // Important: Throw the error to ensure it can be caught in the component

      });
  };


  export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post('/auth/register', user);
        dispatch(registerSuccess(res.data));
        return res.data;
    } catch (error) {
        dispatch(registerFailure());
        throw error;  // Ensure the error is thrown with response data
    }
};


  export const searchProducts = async (query) => {
    try {
        const response = await publicRequest.get(`/products/search?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};