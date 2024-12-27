import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  bills: [],
  setBillId: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/bills`;

// Fetch all bills
export const fetchBills = createAsyncThunk(
  'bills/fetchBills',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a brand by ID
export const fetchBillById = createAsyncThunk(
  'bills/fetchBillById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new brand
export const createBill = createAsyncThunk(
  'bills/createBill',
  async (billData) => {
    try {
      const response = await axios.post(`${API_URL}`, billData);
      return response.data; // Assuming response.data.brand contains the created brand
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a brand
export const updateBill = createAsyncThunk(
  'bills/updateBill',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data.brand; // Assuming response.data.brand contains the updated brand
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteBill = createAsyncThunk(
  'bills/deleteBill',
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
const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setBillId:(state,action)=>{
      state.setBillId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchBillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchBillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills.push(action.payload); // Add new brand to state
      })
      .addCase(createBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.bills = state.bills.map(brand => 
            brand.id === action.payload.id ? action.payload : brand
          );
        }
      })
      .addCase(updateBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = state.bills.filter(
          (brand) => brand.id !== action.payload
        ); // Remove the brand from state
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setBillId} = billSlice.actions;

export default billSlice.reducer;
