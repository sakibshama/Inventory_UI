import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSell } from "../../Slicer/SellsSlicer";
import {fetchCustomers} from './../../Slicer/CustomerSlicer';

function CreateSell() {

  const dispatch = useDispatch();


  const customers = useSelector((state)=>state.customers.customers);


  useEffect(()=>{
    dispatch(fetchCustomers());
    console.log(customers);
    
  },[])

    
    const dimissModal = useRef();
    const [sellData, setSellData] = useState({
      customer_id:null,
      total_amount: "",
      total_profit: "",
      total_comission: ""
    });
  
    
  
    const handleCreateSell = () => {

  
      dispatch(createSell(sellData))
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
        Add Sell
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
                Add a New Sell
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
                <label className="form-label">Customer Name</label>

                <select className="form-select" onChange={(e)=>{setSellData({...sellData, customer_id:e.target.value})}}>
                  <option selected>Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
              </div>


              <div className="mb-3">
                <label htmlFor="brandNameInput" className="form-label">
                  Total Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="customer name"
                  value={sellData.total_amount}
                  onChange={(e) => {
                    setSellData({ ...sellData, total_amount: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandNameInput" className="form-label">
                  Total Profit
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Profit"
                  value={sellData.total_profit}
                  onChange={(e) => {
                    setSellData({ ...sellData, total_profit: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandNameInput" className="form-label">
                  Total Comission
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Comission"
                  value={sellData.total_comission}
                  onChange={(e) => {
                    setSellData({ ...sellData, total_comission: e.target.value });
                  }}
                />
              </div>
            
             
            
             
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateSell}
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

export default CreateSell