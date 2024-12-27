import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateExpenses, fetchExpensesById } from "../../Slicer/ExpenseSlicer";
import { fetchPayment } from './../../Slicer/paymentTypeSlicer';
import { fetchExpenseCategorys} from "../../Slicer/ExpenseCategorySlicer";
import {updateExpenseTransaction} from '../../Slicer/TransactionSlicer';



function UpdateExpense() {
    const dispatch = useDispatch();
    const expenseId = useSelector((state) => state.expenses.expenseId);

    const paymentTypes = useSelector((state) => state.paymentType.paymentType);
    const expenseCategorys = useSelector((state) => state.expenseCategorys.expenseCategorys);

    useEffect(() => {
      dispatch(fetchPayment());
      dispatch(fetchExpenseCategorys());
    }, [])
  
  
    // Initialize useForm
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm();
  
    // Fetch expenses data and set form values
    useEffect(() => {
      dispatch(fetchExpensesById(expenseId)).then((res) => {
        const { description, expenser_name, amount, payment_type_id, expense_category_id } = res.payload;
        setValue("description", description); // Set form field value
        setValue("expenser_name", expenser_name); 
        setValue("amount", amount);
        setValue("expense_category_id", expense_category_id);
        setValue("payment_type_id", payment_type_id);
       });
    }, [dispatch, expenseId, setValue]);
  
    // Handle file change for the brand image
  
    // Form submit handler
    const onSubmit = (data) => {

  
      dispatch(updateExpenses({ id: expenseId, updatedData: data })).then((res)=>{

        let upData = {
          payment_type_id:data.payment_type_id,
          amount: data.amount,
          comment:data.description
        };

        dispatch(updateExpenseTransaction({id:expenseId, updatedData:upData})).then((res)=>{
          console.log(res);
          
        })

      });


    };
  
    return (
      <div>
       
  
        <div
          className="modal fade"
          id="updateBrandModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="updateBrandLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateBrandLabel">
                  Update Expenser
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>



                <div className="mb-3">
                <label htmlFor="brandImageFile" className="form-label">
                  Expense Category
                </label>
                <select className="form-select" name="" id="" 
                
                {...register("expense_category_id")}
                onChange={(e) => {
                  setValue("expense_category_id", e.target.value )
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
                    <label htmlFor="brandNameUpdate" className="form-label">
                      Desciription
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="customer name"
                      {...register("description")}
                    />
                    {errors.desciription && (
                      <p className="text-danger">{errors.desciription.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="desciriptionNameUpdate" className="form-label">
                     Expenser Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="customer name"
                      {...register("expenser_name", {
                        required: "Expenser name is required",
                      })}
                    />
                    {errors.expenser_name && (
                      <p className="text-danger">{errors.expenser_name.message}</p>
                    )}
                  </div>




                  <div className="mb-3">
                <label htmlFor="brandImageFile" className="form-label">
                  Payment Type
                </label>
                <select className="form-select" name="" id="" 
                
                {...register("payment_type_id")}
                onChange={(e) => {setValue("payment_type_id", e.target.value )
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
                    <label htmlFor="SellPrice" className="form-label">
                      Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="Amount"
                      {...register("amount")}
                    />
                    {errors.amount && (
                      <p className="text-danger">{errors.amount.message}</p>
                    )}
                  </div>
                     
  
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UpdateExpense