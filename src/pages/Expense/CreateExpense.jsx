import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, setexpenseTransactionId } from "../../Slicer/ExpenseSlicer";
import { fetchPayment } from './../../Slicer/paymentTypeSlicer';
import { fetchExpenseCategorys} from "../../Slicer/ExpenseCategorySlicer";
import { createTransaction} from "../../Slicer/TransactionSlicer";
// import ExpenseTransaction from "./ExpenseTransaction";


function CreateExpense() {
    const dispatch = useDispatch();
    const dimissModal = useRef();
    const paymentTypes = useSelector((state) => state.paymentType.paymentType);
    const expenseCategorys = useSelector((state) => state.expenseCategorys.expenseCategorys);
    


    

    const [expenseData, setExpenseData] = useState({
      description: "",
      expenser_name: "",
      payment_type_id:null,
      expense_category_id:null,
      amount: ""
    });


    useEffect(() => {
      dispatch(fetchPayment());
      dispatch(fetchExpenseCategorys());
    }, [])
  
  
  
    const handleCreateExpense = () => {

  
      dispatch(createExpense(expenseData))
        .then((res) => {

          let transData = {
            payment_type_id:expenseData.payment_type_id,
            transaction_type:"out",
            amount: expenseData.amount,
            comment:expenseData.description,
            expense_id:res.payload.id
          };

          dispatch(createTransaction(transData)).then((res)=>{
            console.log(res);
            
            dimissModal.current.click();
          })

          // setexpenseTransactionId(res.payload.id);
          
        })
        .catch((err) => {
          console.error("Error creating Expense:", err);
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
        Add Expense
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
                Add a New Expense
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
                <label htmlFor="brandImageFile" className="form-label">
                  Expense Category
                </label>
                <select className="form-select" name="" id="" onChange={(e) => {
                  setExpenseData
                    ({ ...expenseData, expense_category_id: e.target.value })
                }}>

                  <option>Select Expense</option>
                  {
                    expenseCategorys.map((value, index) => (
                      <option key={index} value={value.id}>{value.name}</option>
                    ))
                  }

                </select>

              </div>
              <div className="mb-3">
                <label htmlFor="brandNameInput" className="form-label">
                  Deseiription
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Description"
                  value={expenseData.description}
                  onChange={(e) => {
                    setExpenseData({ ...expenseData, description: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandImageFile" className="form-label">
                  Expensor Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ExpenseNameInput"
                  placeholder="Expensor Name"
                  value={expenseData.expenser_name}
                  onChange={(e)=>{setExpenseData({...expenseData, expenser_name: e.target.value})}}
                />
  
              </div>
             






              <div className="mb-3">
                <label htmlFor="brandImageFile" className="form-label">
                  Payment Type
                </label>
                <select className="form-select" name="" id="" onChange={(e) => {
                  setExpenseData
                    ({ ...expenseData, payment_type_id: e.target.value })
                }}>

                  <option>Select Payment Method</option>
                  {
                    paymentTypes.map((paymentType, index) => (
                      <option key={index} value={paymentType.id}>{paymentType.type}</option>
                    ))
                  }

                </select>

              </div>








              <div className="mb-3">
                <label htmlFor="expense " className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expense"
                  placeholder="Amount"
                  value={expenseData.amount}
                  onChange={(e)=>{setExpenseData({...expenseData, amount: e.target.value})}}
                />
  
              </div>


              {/* <ExpenseTransaction/> */}
              
             
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateExpense}
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

export default CreateExpense