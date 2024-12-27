import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "../../Slicer/RoleSlicer";

function CreateRole() {

  const dispatch = useDispatch();

    
    const dimissModal = useRef();

    const [roleData, setRoleData] = useState({
      role_name:"",
      permissions: null
    });
  
    
  
    const handleCreateRole = () => {

  
      dispatch(createRole(roleData))
        .then((res) => {
          // Close the modal after customer is created
          dimissModal.current.click();
        })
        .catch((err) => {
          console.error("Error creating Role:", err);
        });
    };
  
    return (
      <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createBrandModal"
      >
        Add Role
      </button>
  
      <div
        className="modal fade"
        id="createBrandModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createBrandLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createBrandLabel">
                Add a New Role
              </h5>
              <button
                type="submit"
                ref={dimissModal}
                data-bs-dismiss="modal"
                className="btn btn-danger"
                hidden
              >
                x
              </button>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Role Name</label>

                <input type="text" placeholder="Role Name" className="form-control"
                    value={roleData.role_name} 
                    onChange={(e)=>{setRoleData({...roleData, role_name:e.target.value})}} />
              </div>


              <div className="mb-3">
                <label htmlFor="brandNameInput" className="form-label">
                  Permissions
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Permissions"
                  value={roleData.permissions}
                  onChange={(e) => {
                    setRoleData({ ...roleData, permissions: e.target.value });
                  }}
                />
              </div>
            
             
            
             
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateRole}
                type="button"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default CreateRole