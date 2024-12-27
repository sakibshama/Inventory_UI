import React, { useState,useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../Slicer/UserSlicer";
import {fetchRoles} from '../../Slicer/RoleSlicer';

function CreateUser() {

  const dispatch = useDispatch();
  const roles = useSelector((state)=>state.roles.roles);



  useEffect(()=>{
    dispatch(fetchRoles());
  },[])


  const dismissModal = useRef();
  const [userData, setUserData] = useState({
    role_id: null,
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    c_percentage: null,
    c_amount: 0,
    image: null,
    status:1
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, image: file });
  };

  const handleCreateUser = () => {

    dispatch(createUser(userData))
      .then(() => {
        dismissModal.current.click(); // Close modal after user is created
      })
      .catch((err) => {
        console.error("Error creating user:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createUserModal"
      >
        Add User
      </button>

      <div
        className="modal fade"
        id="createUserModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createUserLabel">
                Add a New User
              </h5>
              <button
                type="button"
                ref={dismissModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row">



              <div className="mb-3 col-md-6">
                <label htmlFor="roleIdInput" className="form-label">
                  Role
                </label>
                <select className="form-select" onChange={(e) => setUserData({ ...userData, role_id: e.target.value })}>
                  <option value="">Select Role</option>
                  {roles.map((val,i)=>{
                    return(
                      <option key={i} value={val.id}>{val.role_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userNameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userNameInput"
                  placeholder="User Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userEmailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmailInput"
                  placeholder="User Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userPasswordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="userPasswordInput"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userGenderInput" className="form-label">
                  Gender
                </label>
                <select className="form-select" onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userPhoneInput" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userPhoneInput"
                  placeholder="Phone"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userPercentageInput" className="form-label">
                  Commission Percentage
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="userPercentageInput"
                  placeholder="Commission Percentage"
                  value={userData.c_percentage}
                  onChange={(e) => setUserData({ ...userData, c_percentage: e.target.value })}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="userImageInput" className="form-label">
                  Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="userImageInput"
                  onChange={handleImage}
                />
              </div>
           
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateUser}
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
  );
}

export default CreateUser;
