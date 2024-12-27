import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateExpenseCategorys, fetchExpenseCategoryById } from "../../Slicer/ExpenseCategorySlicer";

function UpdateExpenseCategory() {
    const dispatch = useDispatch();
    const expenseCategoryId = useSelector((state) => state.expenseCategorys.expenseCategoryId);
  
    // Initialize useForm
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm();
  
    // Fetch expenseCategory data and set form values
    useEffect(() => {
      dispatch(fetchExpenseCategoryById(expenseCategoryId)).then((res) => {
        const { name, type } = res.payload;
        setValue("name", name); // Set form field value
        setValue("type", type); 
        });
    }, [dispatch, expenseCategoryId, setValue]);
  
    // Handle file change for the brand image
   
  
    // Form submit handler
    const onSubmit = (data) => {
        
       
        dispatch(updateExpenseCategorys({ id: expenseCategoryId, updatedData: data }));
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
               Update Expense Category
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
                    <label htmlFor="brandNameUpdate" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="customername"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor=" ExpenseCategoryNameUpdate" className="form-label">
                      Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="customer name"
                      {...register("type", {
                        required: "Type is required",
                      })}
                    />
                    {errors.type&& (
                      <p className="text-danger">{errors.type.message}</p>
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

export default UpdateExpenseCategory