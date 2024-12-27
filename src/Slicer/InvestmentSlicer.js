import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  investments: [],
  investmentId: null,
  status:null,
  isChanged:false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/investments`;

// Fetch all investments
export const fetchInvestments = createAsyncThunk(
  'investments/fetchInvestments',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a investment by ID
export const fetchInvestmentById = createAsyncThunk(
  'investments/fetchInvestmentById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new investment
export const createInvestment = createAsyncThunk(
  'investments/createInvestment',
  async (investmentData) => {
    try {
      const response = await axios.post(`${API_URL}`, investmentData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.investment contains the created investment
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a investment
export const updateInvestment = createAsyncThunk(
  'investments/updateInvestment',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.investment contains the updated investment
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteInvestment = createAsyncThunk(
  'investments/deleteInvestment',
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
const investmentSlicer = createSlice({
  name: 'investments',
  initialState,
  reducers: {
    investmentIdz:(state,action)=>{
      state.investmentId=action.payload;
    },
    setStatus:(state,action)=>{
      state.status=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = action.payload; // Expecting action.payload to be an array
        state.isChanged=false;
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchInvestmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestmentById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchInvestmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvestment.fulfilled, (state, action) => {
        state.loading = false;
        state.status=true;
        // state.investments.push(action.payload); // Add new stock to state
      })
      .addCase(createInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvestment.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged=true;
      })
      .addCase(updateInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = state.investments.filter(
          (investment) => investment.id !== action.payload
        ); // Remove the investment from state
      })
      .addCase(deleteInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {investmentIdz, setStatus} = investmentSlicer.actions;

export default investmentSlicer.reducer;
