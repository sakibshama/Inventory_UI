import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

// Initial state
const initialState = {
  expenses: [],
  expenseId: null,
  expenseTransactionId: null,
  isChanged: false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/expenses`;

// Fetch all expenses
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a expenses by ID
export const fetchExpensesById = createAsyncThunk(
  'expenses/fetchExpensesById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new expenses
export const createExpense = createAsyncThunk(
  'expenses/createExpenses',
  async (expenseData) => {
    try {
      const response = await axios.post(`${API_URL}`, expenseData);
      return response.data; // Assuming response.data.expenses contains the created expenses
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a expenses
export const updateExpenses = createAsyncThunk(
  'expenses/updateExpenses',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.expenses contains the updated expenses
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a brand
export const deleteExpenses = createAsyncThunk(
  'expenses/deleteExpenses',
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
const expenseSlicer = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    expenseIdz: (state, action) => {
      state.expenseId = action.payload;
    },
  setexpenseTransactionId: (state, action) => {
    state.expenseTransactionId = action.payload;
  },
  setChangeStatus: (state, action) => {

    state.isChanged = action.payload;

  }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload; // Expecting action.payload to be an array
        state.isChanged = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchExpensesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched brand if needed
      })
      .addCase(fetchExpensesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged = true;
        // state.expenses.push(action.payload); // Add new Expense to state
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenses.fulfilled, (state, action) => {
        state.loading = false;
        // if (action.payload && action.payload.id) {
        //   state.expenses = state.expenses.map(expense => 
        //     expense.id === action.payload.id ? action.payload : expense
        //   );
        // }

        state.isChanged = true;

      })
      .addCase(updateExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        ); // Remove the expense from state
      })
      .addCase(deleteExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const { expenseIdz, setChangeStatus, setexpenseTransactionId } = expenseSlicer.actions;

export default expenseSlicer.reducer;
