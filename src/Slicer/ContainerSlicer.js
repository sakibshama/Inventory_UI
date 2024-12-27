import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  Container: [],
  setContainerId: null,
  loading: false,
  error: null,
};


// const API_URL = `http://lb.app.mystrix.site/api/categories`;
// const API_URL = `http://localhost:8000/api/categories`;
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/containers`

// Fetch all Container
export const fetchContainer = createAsyncThunk(
  'Container/fetchContainer',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Make sure this is an array
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a Container by ID
export const fetchContainerById = createAsyncThunk(
  'Container/fetchContainerById',
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

// Create a new Container
export const createContainer = createAsyncThunk(
  'Container/createContainer',async (ContainerData) => {
    
    try {
      
      const response = await axios.post(`${API_URL}`,ContainerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming response.data.Container contains the created Container
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a Container
export const updateContainer = createAsyncThunk(
  'Container/updateContainer',
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
// export const updateContainer = createAsyncThunk(
//   'Container/updateContainer',
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
      
//       // Return the updated Container data from the response
//       return response.data;
//     } catch (error) {
//       // Reject the action with an error message or response data
//       return thunkAPI.rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// Delete a Container
export const deleteContainer = createAsyncThunk(
  'Container/deleteContainer',
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
const ContainerSlice = createSlice({
  name: 'Container',
  initialState,
  reducers: {
    setContainerIdz:(state,action)=>{
      state.setContainerId=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.Container = action.payload; // Expecting action.payload to be an array
      })
      .addCase(fetchContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchContainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainerById.fulfilled, (state) => {
        state.loading = false;
        // Store the fetched Container if needed
      })
      .addCase(fetchContainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.Container.push(action.payload); // Add new Container to state
      })
      .addCase(createContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContainer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.Container = state.Container.map(Container => 
           
            
            Container.id === action.payload.id ? action.payload : Container
            

          );
          
        }
      })

    
      .addCase(updateContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.Container = state.Container.filter(
          (Container) => Container.id !== action.payload
        ); // Remove the Container from state
      })
      .addCase(deleteContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer
export const  {setContainerIdz} = ContainerSlice.actions;

export default ContainerSlice.reducer;
