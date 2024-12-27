import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  brands: [],
  setBrandId: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_URL}/brand`;

// Fetch all brands
export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
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
export const fetchBrandById = createAsyncThunk(
  'brands/fetchBrandById',
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
export const createBrand = createAsyncThunk(
  'brands/createBrand',
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
export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
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
export const deleteBrand = createAsyncThunk(
  'brands/deleteBrand',
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
const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrandId:(state,action)=>{
      state.brandId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload); // Add new brand to state
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.brands = state.brands.map(brand => 
            brand.id === action.payload.id ? action.payload : brand
          );
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(
          (brand) => brand.id !== action.payload
        ); // Remove the brand from state
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setBrandId} = brandSlice.actions;

export default brandSlice.reducer;
