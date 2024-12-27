import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
 allstocks: [],
  stockId: null,
  stock_id:null,
  isChanged:false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/all-stock`;

// Fetch all stocks
export const fetchAllStocks = createAsyncThunk(
  'allstocks/fetchStocks',
  async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a stock by ID
export const fetchAllStockById = createAsyncThunk(
  'allstocks/fetchStockById',
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
export const createAllStock = createAsyncThunk(
  'allstocks/createStock',
  async (allstockData) => {
    try {
      const response = await axios.post(`${API_URL}`, allstockData, {
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
export const updateAllStock = createAsyncThunk(
  'allstocks/updateStock',
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
export const deleteAllStock = createAsyncThunk(
  'allstocks/deleteStock',
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
      .addCase(fetchAllStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.allstocks = action.payload; // Expecting action.payload to be an array
        state.isChanged=false;
      })
      .addCase(fetchAllStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchAllStockById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStockById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchAllStockById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createAllStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAllStock.fulfilled, (state, action) => {
        state.loading = false;
        //state.stocks.push(action.payload); // Add new stock to state
        state.isChanged=true;
        state.stock_id=action.payload.stock_id;
      })
      .addCase(createAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateAllStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAllStock.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.stocks = state.stocks.map(stock => 
            stock.id === action.payload.id ? action.payload : stock
          );
        }
      })
      .addCase(updateAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteAllStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllStock.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = state.stocks.filter(
          (stock) => stock.id !== action.payload
        ); // Remove the stock from state
      })
      .addCase(deleteAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {stockId} = stockSlicer.actions;

export default stockSlicer.reducer;
