import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../Slicer/CustomerSlicer";

function CreateCustomer() {
    const dispatch = useDispatch();
  const dimissModal = useRef();
  const [customerData, setCustomerData] = useState({
    name: "",
    contact: "",
    address: "",
    image: null
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setCustomerData({ ...customerData, image: file });
  };

  const handleCreateCustomer = () => {


    dispatch(createCustomer(customerData))
      .then((res) => {
        // Close the modal after customer is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating customer:", err);
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
      Add Customer
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
              Add a New Customer
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
              <label htmlFor="brandNameInput" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                placeholder="Customer name"
                value={customerData.name}
                onChange={(e) => {
                  setCustomerData({ ...customerData, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Customer Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                placeholder="Customer Contact"
                value={customerData.contact}
                onChange={(e)=>{setCustomerData({...customerData, contact: e.target.value})}}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Customer Address
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                placeholder="Customer Address"
                value={customerData.address}
                onChange={(e)=>{setCustomerData({...customerData, address: e.target.value})}}
              />

            </div>

            
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Customer Image
              </label>
              <input
                className="form-control"
                type="file"
                id="brandImageFile"
                onChange={handleImage}
              />

            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCreateCustomer}
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

export default CreateCustomer