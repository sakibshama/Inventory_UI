import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  expenseCategorys: [],
  expenseCategoryId: null,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/expense-categories`;

// Fetch all expenseCategorys
export const fetchExpenseCategorys = createAsyncThunk(
  'expenseCategoryss/fetchExpenseCategorys',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch aExpenseCategorysby ID
export const fetchExpenseCategoryById = createAsyncThunk(
  'ExpenseCategorys/fetchExpenseCategoryById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new ExpenseCategorys
export const createExpenseCategorys = createAsyncThunk(
  'ExpenseCategorys/createExpenseCategorys',
  async (customerData) => {
    try {
      const response = await axios.post(`${API_URL}`, customerData);
      return response.data; // Assuming response.data.ExpenseCategorys contains the created ExpenseCategorys
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a ExpenseCategorys
export const updateExpenseCategorys = createAsyncThunk(
  'expenseCategorys/updateExpenseCategorys',
  async ({ id, updatedData }, thunkAPI) => {
    try {

      const response = await axios.put(`${API_URL}/${id}`, updatedData );
      return response.data; // Assuming response.data.ExpenseCategorys contains the updated ExpenseCategorys
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteExpenseCategorys = createAsyncThunk(
  'expenseCategorys/deleteExpenseCategorys',
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
const expenseCategorySlicer = createSlice({
  name: 'ExpenseCategorys',
  initialState,
  reducers: {
    expenseCategoryIdz:(state,action)=>{
      state.expenseCategoryId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseCategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseCategorys = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchExpenseCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchExpenseCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseCategoryById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchExpenseCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createExpenseCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpenseCategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseCategorys.push(action.payload); // Add new ExpenseCategory to state
      })
      .addCase(createExpenseCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateExpenseCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseCategorys.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.expenseCategorys = state.expenseCategorys.map(expenseCategory => 
            expenseCategory.id === action.payload.id ? action.payload : expenseCategory
          );
        }
      })
      .addCase(updateExpenseCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteExpenseCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenseCategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseCategorys = state.expenseCategorys.filter(
          (expenseCategory) => expenseCategory.id !== action.payload
        ); // Remove the ExpenseCategory from state
      })
      .addCase(deleteExpenseCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {expenseCategoryIdz} = expenseCategorySlicer.actions;

export default expenseCategorySlicer.reducer;
