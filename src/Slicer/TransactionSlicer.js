import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  transaction: [],
  setTransactionId: null,
  getStockId:null,
  isChanged:false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/transactions`;

// Fetch all transaction
export const fetchTransaction = createAsyncThunk(
  'transaction/fetchTransaction',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a transaction by ID
export const fetchTransactionById = createAsyncThunk(
  'transaction/fetchTransactionById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new transaction
export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (transactionData) => {
    try {
      const response = await axios.post(`${API_URL}`, transactionData);
      return response.data.transaction; // Assuming response.data.transaction contains the created transaction
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a transaction
export const updateTransaction = createAsyncThunk(
  'transaction/updateTransaction',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data.transaction contains the updated transaction
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


export const updateExpenseTransaction = createAsyncThunk(
  'transaction/updateExpenseTransaction',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, updatedData);
      return response.data; // Assuming response.data.transaction contains the updated transaction
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateInvestmentTransaction = createAsyncThunk(
  'transaction/updateInvestmentTransaction',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/update_investment/${id}`, updatedData);
      return response.data; // Assuming response.data.transaction contains the updated transaction
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a transaction
export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
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
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionId:(state,action)=>{
      state.setTransactionId=action.payload;
    },
    setStockId:(state,action)=>{
      state.getStockId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload; // Expecting action.payload to be an array
        state.isChanged=false;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched transaction if needed
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        // state.transaction.push(action.payload); // Add new transaction to state
        state.isChanged=true;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.transaction = state.transaction.map(transaction => 
            transaction.id === action.payload.id ? action.payload : transaction
          );
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateExpenseTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpenseTransaction.fulfilled, (state, action) => {
        state.loading = false;
       
      })
      .addCase(updateExpenseTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
    builder
      .addCase(updateInvestmentTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvestmentTransaction.fulfilled, (state, action) => {
        state.loading = false;
       
      })
      .addCase(updateInvestmentTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = state.transaction.filter(
          (transaction) => transaction.id !== action.payload
        ); // Remove the transaction from state
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setTransactionId, setStockId} = transactionSlice.actions;

export default transactionSlice.reducer;
