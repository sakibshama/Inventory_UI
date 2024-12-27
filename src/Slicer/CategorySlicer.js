import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  Category: [],
  setCategoryId: null,
  loading: false,
  error: null,
};


// const API_URL = `http://lb.app.mystrix.site/api/categories`;
// const API_URL = `http://localhost:8000/api/categories`;
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/categories`

// Fetch all Category
export const fetchCategory = createAsyncThunk(
  'Category/fetchCategory',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a Category by ID
export const fetchCategoryById = createAsyncThunk(
  'Category/fetchCategoryById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new Category
export const createCategory = createAsyncThunk(
  'Category/createCategory',async (categoryData) => {
    
    try {
      
      const response = await axios.post(`${API_URL}`,categoryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.Category contains the created Category
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a Category
export const updateCategory = createAsyncThunk(
  'Category/updateCategory',
  async ({ id, updatedData }, thunkAPI) => {
    
    try {

      const response = await axios.put(`${API_URL}/${id}`, updatedData);

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
// export const updateCategory = createAsyncThunk(
//   'Category/updateCategory',
//   async ({ id, updatedData }, thunkAPI) => {
//     try {
//       // If the updatedData contains a file (image), convert it to FormData
//       const payload = updatedData.image instanceof File 
//         ? (() => {
//             const formData = new FormData();
//             Object.keys(updatedData).forEach((key) => {
//               formData.append(key, updatedData[key]);
//             });
//             return formData;
//           })() 
//         : updatedData;

//       // Send the PUT request with the constructed payload
//       const response = await axios.put(`${API_URL}/${id}`, payload);
      
//       // Return the updated category data from the response
//       return response.data;
//     } catch (error) {
//       // Reject the action with an error message or response data
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// Delete a Category
export const deleteCategory = createAsyncThunk(
  'Category/deleteCategory',
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
const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    setCategoryId:(state,action)=>{
      state.setCategoryId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Category = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched Category if needed
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Category.push(action.payload); // Add new Category to state
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.Category = state.Category.map(Category => 
           
            
            Category.id === action.payload.id ? action.payload : Category
            

          );
          
        }
      })

    
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Category = state.Category.filter(
          (Category) => Category.id !== action.payload
        ); // Remove the Category from state
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setCategoryId} = CategorySlice.actions;

export default CategorySlice.reducer;
