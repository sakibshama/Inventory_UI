import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  sellItems: [],
  sellItemId: null,
  isChanged:false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/sell-items`;

// Fetch all sellItems
export const fetchSellItems = createAsyncThunk(
  'sellItems/fetchSellItems',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a sellItem by ID
export const fetchSellItemById = createAsyncThunk(
  'sellItems/fetchSellItemById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new sell
export const createSellItem = createAsyncThunk(
  'sellItems/createSellItem',
  async (customerData) => {
    try {
      const response = await axios.post(`${API_URL}`, customerData);
      return response.data; // Assuming response.data.sell contains the created sell
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a sell
export const updateSellItem = createAsyncThunk(
  'sellItems/updateSellItem',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.sell contains the updated sell
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteSellItem = createAsyncThunk(
  'stoks/deleteSellItem',
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
const sellItemSlicer = createSlice({
  name: 'sells',
  initialState,
  reducers: {
    sellItemIdz:(state,action)=>{
      state.sellItemId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellItems.fulfilled, (state, action) => {
        state.loading = false;
        state.sellItems = action.payload; // Expecting action.payload to be an 
        state.isChanged=false;
      })
      .addCase(fetchSellItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchSellItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellItemById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchSellItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createSellItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSellItem.fulfilled, (state, action) => {
        state.loading = false;
        // state.sellItems.push(action.payload); // Add new stock to state
        state.isChanged=true;
      })
      .addCase(createSellItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateSellItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellItem.fulfilled, (state, action) => {
        state.loading = false;
       state.isChanged=true;
      })
      .addCase(updateSellItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteSellItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSellItem.fulfilled, (state, action) => {
        state.loading = false;
        state.sellItems = state.sellItems.filter(
          (sellItem) => sellItem.id !== action.payload
        ); // Remove the sell from state
      })
      .addCase(deleteSellItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {sellItemIdz} = sellItemSlicer.actions;

export default sellItemSlicer.reducer;
