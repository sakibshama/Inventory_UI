import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBill } from "../../Slicer/BillSlicer";

const CreateBill = () => {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [billData, setBillData] = useState({
    total_amount: "",
    paid_amount: "",
    due_amount: "",
    discount_amount: "",
    //TODO::create backend of customer 
    customer_due: "",
    
    status: "1",
  });



  const handleCreateBill = () => {
    const formData = new FormData();
      formData.append("total_amount", billData.total_amount);
      formData.append("paid_amount", billData.paid_amount);
      formData.append("due_amount", billData.due_amount);
      formData.append("discount_amount", billData.discount_amount);
   formData.append("status", billData.status);

    dispatch(createBill(formData))
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
            <div className="modal-body">
              <div className="mb-3">
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
            </div>
            <div className="modal-body">
              <div className="mb-3">
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
            </div>

            <div className="modal-body">
              <div className="mb-3">
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
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="billNameInput" className="form-label">
                  DISCOUNT AMOUNT
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="billDiscountInput"
                  placeholder="E.g. Asus"
                  value={billData.discount_amount}
                  onChange={(e) => {
                    setBillData({
                      ...billData,
                      discount_amount: e.target.value,
                    });
                  }}
                />
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
