import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../../Slicer/TransactionSlicer";
import { fetchPayment } from "../../Slicer/paymentTypeSlicer";

const CreateTransaction = () => {

  const dispatch = useDispatch();
  const dimissModal = useRef();
  const paymentType = useSelector((state)=>state.paymentType.paymentType);


  useEffect(()=>{
    dispatch(fetchPayment());
  },[])


  const [transactionData, setTransactionData] = useState({
    payment_type_id:null,
    transaction_type:"",
    amount: null,
    comment:"",
  });

  const handleCreateTransaction = () => {


    dispatch(createTransaction(transactionData))
      .then((res) => {
        // Close the modal after transaction is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating transaction:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createTransactionModal"
      >
        Add Transaction
      </button>

      <div
        className="modal fade"
        id="createTransactionModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createTransactionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createTransactionLabel">
                Add Transaction amount
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
                <label htmlFor="transactionNameInput" className="form-label">
                   Transaction Type
                </label>
                <select className="form-select" onChange={(e)=>{setTransactionData({...transactionData,transaction_type:e.target.value})}}>
                  <option>Select Type</option>
                  <option value="in">in</option>
                  <option value="out">out</option>

                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="transactionNameInput" className="form-label">
                   Transaction Method
                </label>
                <select className="form-select" onChange={(e)=>{setTransactionData({...transactionData,payment_type_id:e.target.value})}}>
                  <option>Select Payment Type</option>
                  {
                    paymentType.map((paymentType)=>
                      <option key={paymentType.id} value={paymentType.id}>{paymentType.type}</option>
                      )
                      
                  }

                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="transactionNameInput" className="form-label">
                   Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="transactionDiscountInput"
                  placeholder="Comment"
                  value={transactionData.comment}
                  onChange={(e) => {
                    setTransactionData({
                      ...transactionData,
                      comment: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="transactionNameInput" className="form-label">
                   AMOUNT
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="transactionDiscountInput"
                  placeholder="Amount"
                  value={transactionData.amount}
                  onChange={(e) => {
                    setTransactionData({
                      ...transactionData,
                      amount: e.target.value,
                    });
                  }}
                />
              </div>



            </div>

            <div className="modal-footer">
              <button
                onClick={handleCreateTransaction}
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

export default CreateTransaction;
