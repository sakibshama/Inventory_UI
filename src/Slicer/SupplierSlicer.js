import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  suppliers: [],
  setSupplierId: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/suppliers`;

// Fetch all suppliers
export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchSuppliers',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a supplier by ID
export const fetchSupplierById = createAsyncThunk(
  'suppliers/fetchSupplierById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new supplier
export const createSupplier = createAsyncThunk(
  'suppliers/createSupplier',
  async (supplierData) => {
    try {
      const response = await axios.post(`${API_URL}`, supplierData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.supplier contains the created supplier
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a supplier
export const updateSupplier = createAsyncThunk(
  'suppliers/updateSupplier',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.supplier contains the updated supplier
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a supplier
export const deleteSupplier = createAsyncThunk(
  'suppliers/deleteSupplier',
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
const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setSupplierIdz:(state,action)=>{
      state.setSupplierId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchSupplierById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplierById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched supplier if needed
      })
      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers.push(action.payload); // Add new supplier to state
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.suppliers = state.suppliers.map(supplier => 
            supplier.id === action.payload.id ? action.payload : supplier
          );
        }
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        ); // Remove the supplier from state
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setSupplierIdz} = supplierSlice.actions;

export default supplierSlice.reducer;
