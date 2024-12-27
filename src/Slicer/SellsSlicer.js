import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  sells: [],
  sellId: null,
  isChanged: false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/sells`;

// Fetch all stocks
export const fetchSell = createAsyncThunk(
  'sells/fetchSells',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a sell by ID
export const fetchSellById = createAsyncThunk(
  'stocks/fetchStockById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new stock
export const createSell = createAsyncThunk(
  'sells/createSell',
  async (sellData) => {
    try {
      const response = await axios.post(`${API_URL}`, sellData);
      return response.data; // Assuming response.data.stock contains the created stock
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a stock
export const updateSell = createAsyncThunk(
  'sells/updateSell',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.stock contains the updated stock
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteSell = createAsyncThunk(
  'sells/deleteSell',
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
const sellSlicer = createSlice({
  name: 'sells',
  initialState,
  reducers: {
    sellIdz: (state, action) => {
      state.sellId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSell.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSell.fulfilled, (state, action) => {
        state.loading = false;
        state.sells = action.payload; // Expecting action.payload to be an array
        state.isChanged = false;
      })
      .addCase(fetchSell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchSellById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchSellById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createSell.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSell.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged = true;
        //state.sells.push(action.payload); // Add new stock to state
      })
      .addCase(createSell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateSell.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSell.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged = true;
      })
      .addCase(updateSell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteSell.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSell.fulfilled, (state, action) => {
        state.loading = false;
        state.sells = state.sells.filter(
          (sell) => sell.id !== action.payload
        ); // Remove the stock from state
      })
      .addCase(deleteSell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const { sellIdz } = sellSlicer.actions;

export default sellSlicer.reducer;
