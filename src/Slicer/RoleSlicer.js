import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  roles: [],
  roleId: null,
  isChanged: false,
  loading: false,
  error: null,
};

// Define the base URL for API requests
const API_URL = `${import.meta.env.VITE_BASE_URL}/api/roles`;

// Fetch all roles
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Expecting an array of roles
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch a role by ID
export const fetchRoleById = createAsyncThunk(
  'roles/fetchRoleById',
  async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Create a new role
export const createRole = createAsyncThunk(
  'roles/createRole',
  async (roleData) => {
    try {
      const response = await axios.post(`${API_URL}`, roleData);
      return response.data; // Assuming response.data contains the created role
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Update a role
export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Assuming response.data contains the updated role
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Delete a role
export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  }
);

// Slice definition
const roleSlicer = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoleId: (state, action) => {
      state.roleId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload; // Expecting an array of roles
        state.isChanged = false;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(fetchRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally store the fetched role details in the state
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged = true;
        // Optionally add the new role to the state.roles array
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.isChanged = true;
        // Optionally update the modified role in the state.roles array
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });

    builder
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload); // Remove the role from state
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error message
      });
  },
});

// Export the reducer and actions
export const { setRoleId } = roleSlicer.actions;

export default roleSlicer.reducer;
