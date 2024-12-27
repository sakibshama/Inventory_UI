import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  customers: [],
  setCustomerIdz: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/customers`;

// Fetch all customers
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch a customer by ID
export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Create a new customer
export const createCustomer = createAsyncThunk(
  'customers/createCustomer',
  async (customerData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}`, customerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data contains the created customer
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Update a customer
export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      console.log(response.data);
      return response.data; // Assuming response.data contains the updated customer
      
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a customer
export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Slice definition
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomerId: (state, action) => {
      state.setCustomerIdz = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch customer by ID
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create customer
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update customer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.customers = state.customers.map((customer) =>
            customer.id === action.payload.id ? action.payload : customer
          );
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setCustomerId } = customerSlice.actions;
export default customerSlice.reducer;
