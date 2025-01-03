import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBillById, updateBill } from "../../Slicer/BillSlicer";
import { fetchCustomers } from "../../Slicer/CustomerSlicer";
import { fetchSell } from "../../Slicer/SellsSlicer";

function UpdateBill() {
  const dispatch = useDispatch();
  const billId  = useSelector((state) => state.bill.setBillId); // Assuming billId is stored in the Redux store
  const customers = useSelector((state) => state.customers.customers);
  const sells = useSelector((state) => state.sells.sells);

  // useEffect to load customers and sells
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchSell());
  }, [dispatch]);

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch bill data and set form values
  useEffect(() => {
    dispatch(fetchBillById(billId)).then((res) => {
      const {
        user_id,
        customer_id,
        sell_id,
        total_amount,
        paid_amount,
        due_amount,
        discount,
        status,
      } = res.payload;

      setValue("user_id", user_id);
      setValue("customer_id", customer_id);
      setValue("sell_id", sell_id);
      setValue("total_amount", total_amount);
      setValue("paid_amount", paid_amount);
      setValue("due_amount", due_amount);
      setValue("discount", discount);
    });
  }, [dispatch, billId, setValue]);

  // Form submit handler
  const onSubmit = (data) => {
    dispatch(updateBill({ id: billId, updatedData: data })).then((res)=>{
        console.log(res);
    });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updateBillModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateBillLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateBillLabel">
                Update Bill
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
                  <label className="form-label">Customer</label>
                  <select
                    className="form-select"
                    {...register("customer_id", { required: "Customer is required" })}
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                  {errors.customer_id && (
                    <p className="text-danger">{errors.customer_id.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Sell</label>
                  <select
                    className="form-select"
                    {...register("sell_id", { required: "Sell is required" })}
                  >
                    <option value="">Select Sell</option>
                    {sells.map((sell) => (
                      <option key={sell.id} value={sell.id}>
                        {sell.id}
                      </option>
                    ))}
                  </select>
                  {errors.sell_id && (
                    <p className="text-danger">{errors.sell_id.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Total Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Total Amount"
                    {...register("total_amount", {
                      required: "Total amount is required",
                    })}
                  />
                  {errors.total_amount && (
                    <p className="text-danger">{errors.total_amount.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Paid Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Paid Amount"
                    {...register("paid_amount", {
                      required: "Paid amount is required",
                    })}
                  />
                  {errors.paid_amount && (
                    <p className="text-danger">{errors.paid_amount.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Due Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Due Amount"
                    {...register("due_amount", {
                      required: "Due amount is required",
                    })}
                  />
                  {errors.due_amount && (
                    <p className="text-danger">{errors.due_amount.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Discount</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Discount"
                    {...register("discount", {
                      required: "Discount is required",
                    })}
                  />
                  {errors.discount && (
                    <p className="text-danger">{errors.discount.message}</p>
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

export default UpdateBill;
