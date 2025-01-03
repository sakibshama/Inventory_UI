import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateSell, fetchSellById } from "../../Slicer/SellsSlicer";
import { fetchCustomers } from "../../Slicer/CustomerSlicer";

function UpdateSell() {
  const dispatch = useDispatch();
  const sellId = useSelector((state) => state.sells.sellId);
  const customers = useSelector((state) => state.customers.customers);
  const [isImageChanged, setIsImageChanged] = useState(0);



  useEffect(() => {
    dispatch(fetchCustomers());
  }, [])

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch sell data and set form values
  useEffect(() => {
    dispatch(fetchSellById(sellId)).then((res) => {
      const { total_amount, customer_id, total_profit, total_comission } = res.payload;
      setValue("customer_id", customer_id); // Set form field value
      setValue("total_amount", total_amount); // Set form field value
      setValue("total_profit", total_profit); // Set form field value
      setValue("total_comission", total_comission); // Set form field value

    });
  }, [dispatch, sellId, setValue]);



  // Form submit handler
  const onSubmit = (data) => {


    dispatch(updateSell({ id: sellId, updatedData: data }));
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
                Update Sell
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
                  <label className="form-label">Customer ID</label>
                  <select className="form-select" onChange={(e) => { setValue("customer_id", e.target.value) }}>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="customer name"
                    {...register("total_amount", {
                      required: "Amount is required",
                    })}
                  />
                  {errors.total_amount && (
                    <p className="text-danger">{errors.total_amount.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Total Profit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Profit"
                    {...register("total_profit", {
                      required: "Amount is required",
                    })}
                  />
                  {errors.total_profit && (
                    <p className="text-danger">{errors.total_profit.message}</p>
                  )}
                </div>


                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Total Comission
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Comission"
                    {...register("total_comission", {
                      required: "Comission is required",
                    })}
                  />
                  {errors.total_amount && (
                    <p className="text-danger">{errors.total_comission.message}</p>
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

export default UpdateSell