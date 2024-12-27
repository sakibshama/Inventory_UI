import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  stocks: [],
  stockId: null,
  isChanged:false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/stocks`;

// Fetch all stocks
export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a stock by ID
export const fetchStockById = createAsyncThunk(
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
export const createStock = createAsyncThunk(
  'stocks/createStock',
  async (stockData) => {
    try {
      const response = await axios.post(`${API_URL}`, stockData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.stock contains the created stock
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a stock
export const updateStock = createAsyncThunk(
  'stocks/updateStock',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.stock contains the updated stock
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteStock = createAsyncThunk(
  'stoks/deleteStock',
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
const stockSlicer = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    stockId:(state,action)=>{
      state.stockId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload; // Expecting action.payload to be an array
        state.isChanged=false;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchStockById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchStockById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStock.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged=true;
        // state.stocks.push(action.payload); // Add new stock to state
      })
      .addCase(createStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.stocks = state.stocks.map(stock => 
            stock.id === action.payload.id ? action.payload : stock
          );
        }
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = state.stocks.filter(
          (stock) => stock.id !== action.payload
        ); // Remove the stock from state
      })
      .addCase(deleteStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {stockId} = stockSlicer.actions;

export default stockSlicer.reducer;
