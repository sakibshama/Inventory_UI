import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  bills: [],
  customer_id: null,
  setGenerateBillId: null,
  isChanged: false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/generate-bill`;

// Fetch all generateBills
export const fetchGenerateBills = createAsyncThunk(
  'generateBills/fetchGenerateBills',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a generateBill by ID
export const fetchGenerateBillsById = createAsyncThunk(
  'generateBills/fetchGenerateBillsById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new generateBill
export const createGenerateBill = createAsyncThunk(
  'generateBills/createGenerateBill',
  async (generateBillsData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, generateBillsData);
      return response.data; // Assuming response.data contains the created generateBill
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Update a generateBill
export const updateGenerateBill = createAsyncThunk(
  'generateBills/updateGenerateBill',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data contains the updated generateBill
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Delete a generateBill
export const deleteGenerateBill = createAsyncThunk(
  'generateBills/deleteGenerateBill',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/delete-bill/${id}`);
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Slice definition
const generateBillSlice = createSlice({
  name: 'generateBills',
  initialState,
  reducers: {
    setGenerateBillIdz: (state, action) => {
      state.setGenerateBillId = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customer_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenerateBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenerateBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
        state.isChanged = false;
      })
      .addCase(fetchGenerateBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createGenerateBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGenerateBill.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged = true;
      })
      .addCase(createGenerateBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateGenerateBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGenerateBill.fulfilled, (state) => {
        state.loading = false;
        state.isChanged = true;
      })
      .addCase(updateGenerateBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteGenerateBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGenerateBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = state.bills.filter(
          (bill) => bill.id !== action.payload
        );
      })
      .addCase(deleteGenerateBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions
export const { setGenerateBillIdz, setCustomerId } = generateBillSlice.actions;

// Export the reducer
export default generateBillSlice.reducer;