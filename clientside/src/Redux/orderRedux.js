import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from "../requestMethods";

export const saveOrder = createAsyncThunk(
  'orders/saveOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/orders", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { getState, rejectWithValue }) => {
      try {
        const userId = getState().user.currentUser._id; // Ensure you have user state available and structured like this
        const response = await userRequest.get(`/orders/find/${userId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  const orderSlice = createSlice({
    name: 'orders',
    initialState: { orders: [], status: null, error: null },
    reducers: {
      clearOrders: (state) => {
        state.orders = [];
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(saveOrder.fulfilled, (state, action) => {
          state.orders.push(action.payload);
        })
        .addCase(fetchOrders.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    }
  });
  
  

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
