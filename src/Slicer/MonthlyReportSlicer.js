import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  monthlyReports: [],
  setMonthlyReportId: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_URL}/monthlyReport`;

// Fetch all MonthlyReport
export const fetchMonthlyReports = createAsyncThunk(
  'monthlyReports/fetchMonthlyReports',
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
export const fetchMonthlyReportById = createAsyncThunk(
  'MonthlyReports/fetchMonthlyReportById',
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
export const createMonthlyReport = createAsyncThunk(
  'monthlyReports/createMonthlyReport',
  async (brandData) => {
    try {
      const response = await axios.post(`${API_URL}/save`, brandData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.brand; // Assuming response.data.brand contains the created brand
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a brand
export const updateMonthlyReport = createAsyncThunk(
  'monthlyReports/updateMonthlyReport',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/update/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.brand; // Assuming response.data.brand contains the updated brand
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteMonthlyReport = createAsyncThunk(
  'monthlyReports/deleteMonthlyReport',
  async (id) => {
    try {
      await axios.get(`${API_URL}/delete/${id}`); // Use delete instead of get
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Slice definition
const monthlyReportSlice = createSlice({
  name: 'monthlyReports',
  initialState,
  reducers: {
    setMonthlyReportId:(state,action)=>{
      state.setMonthlyReportId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyReports.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyReports = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchMonthlyReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchMonthlyReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyReportById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchMonthlyReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createMonthlyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyReports.push(action.payload); // Add new brand to state
      })
      .addCase(createMonthlyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateMonthlyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.monthlyReports = state.monthlyReports.map(brand => 
            brand.id === action.payload.id ? action.payload : brand
          );
        }
      })
      .addCase(updateMonthlyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteMonthlyReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMonthlyReport.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyReports = state.monthlyReports.filter(
          (brand) => brand.id !== action.payload
        ); // Remove the brand from state
      })
      .addCase(deleteMonthlyReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setMonthlyReportId} = monthlyReportSlice.actions;

export default monthlyReportSlice.reducer;
