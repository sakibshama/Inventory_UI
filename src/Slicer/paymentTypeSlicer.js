import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  paymentType: [],
  setPaymentId: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/payment-types`;

// Fetch all Payment
export const fetchPayment = createAsyncThunk(
  'Payment/fetchPayment',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a paymentType by ID
export const fetchPaymentById = createAsyncThunk(
  'Payment/fetchPaymentById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new paymentType
export const createPayment = createAsyncThunk(
  'Payment/createPayment',
  async (paymentData) => {
    try {
      const response = await axios.post(`${API_URL}`, paymentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.paymentType contains the created paymentType
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a paymentType
export const updatePayment = createAsyncThunk(
  'Payment/updatePayment',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.paymentType contains the updated paymentType
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a paymentType
export const deletePayment = createAsyncThunk(
  'Payment/deletePayment',
  async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Use delete instead of get
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Slice definition
const PaymentSlice = createSlice({
  name: 'Payment',
  initialState,
  reducers: {
    setPaymentIdz:(state,action)=>{
      state.setPaymentId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentType = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched paymentType if needed
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentType.push(action.payload); // Add new paymentType to state
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.paymentType = state.paymentType.map(paymentType => 
            paymentType.id === action.payload.id ? action.payload : paymentType
          );
        }
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentType = state.paymentType.filter(
          (paymentType) => paymentType.id !== action.payload
        ); // Remove the paymentType from state
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setPaymentIdz} = PaymentSlice.actions;

export default PaymentSlice.reducer;
