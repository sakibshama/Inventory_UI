import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBill } from "../../Slicer/BillSlicer";
import { fetchUsers } from "../../Slicer/UserSlicer";
import { fetchCustomers } from '../../Slicer/CustomerSlicer';
import { fetchSell } from '../../Slicer/SellsSlicer';

const CreateBill = () => {

  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [billData, setBillData] = useState({
    user_id: null,
    customer_id: null,
    sell_id: null,
    total_amount: "",
    paid_amount: "",
    due_amount: "",
    discount: "",
    status: "1",
  });


  const sells = useSelector((state) => state.sells.sells);
  const customers = useSelector((state) => state.customers.customers);
  const users = useSelector((state) => state.users.users);


  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchUsers());
    dispatch(fetchSell());
  }, []);



  const handleCreateBill = () => {
  

    dispatch(createBill(billData))
      .then((res) => {
        // Close the modal after bill is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating bill:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createBillModal"
      >
        Add Bill
      </button>

      <div
        className="modal fade"
        id="createBillModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createBillLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createBillLabel">
                Add a New Bill
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
            <div className="modal-body row">


              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Select Sell ID
                </label>


                <input placeholder="Stock" list="encodings1" value={billData.sell_id} onChange={(e) => { setBillData({ ...billData, sell_id: e.target.value }) }} class="form-control" />
                <datalist id="encodings1" >

                  {sells && sells.map((val, index) => {
                    return (
                      <option key={index} value={val.id}>{val.id}</option>
                    )
                  })}
                </datalist>

              </div>


              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Select Customer
                </label>


                <input placeholder="Customer" list="encodings2" value={billData.customer_id} onChange={(e) => { setBillData({ ...billData, customer_id: e.target.value }) }} class="form-control" />
                <datalist id="encodings2" >

                  {customers && customers.map((val, index) => {
                    return (
                      <option key={index} value={val.id}>{val.name}</option>
                    )
                  })}
                </datalist>

              </div>




              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="billNameInput" className="form-label">
                  TOTAL AMOUNT
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="billtotalInput"
                  placeholder="E.g. Asus"
                  value={billData.total_amount}
                  onChange={(e) => {
                    setBillData({
                      ...billData,
                      total_amount: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="billNameInput" className="form-label">
                  PAID AMOUNT
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="billPaidInput"
                  placeholder="E.g. Asus"
                  value={billData.paid_amount}
                  onChange={(e) => {
                    setBillData({
                      ...billData,
                      paid_amount: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="billNameInput" className="form-label">
                  DUE AMOUNT
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="billDueInput"
                  placeholder="E.g. Asus"
                  value={billData.due_amount}
                  onChange={(e) => {
                    setBillData({
                      ...billData,
                      due_amount: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="billNameInput" className="form-label">
                  DISCOUNT AMOUNT
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="billDiscountInput"
                  placeholder="E.g. Asus"
                  value={billData.discount}
                  onChange={(e) => {
                    setBillData({
                      ...billData,
                      discount: e.target.value,
                    });
                  }}
                />
              </div>



              
              <div className="mb-3 col-md-12 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Select User
                </label>


                <input placeholder="Customer" list="encodings3" value={billData.user_id} onChange={(e) => { setBillData({ ...billData, user_id: e.target.value }) }} class="form-control" />
                <datalist id="encodings3" >

                  {users && users.map((val, index) => {
                    return (
                      <option key={index} value={val.id}>{val.name}</option>
                    )
                  })}
                </datalist>

              </div>

            </div>

            <div className="modal-footer">
              <button
                onClick={handleCreateBill}
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
};

export default CreateBill;
