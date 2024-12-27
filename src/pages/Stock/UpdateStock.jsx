import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateStock, fetchStockById } from "../../Slicer/StockSlicer";


function UpdateStock() {
    const dispatch = useDispatch();
    const stockId = useSelector((state) => state.stocks.stockId);
    const [isImageChanged, setIsImageChanged] = useState(0);
  
    // Initialize useForm
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm();
  
    // Fetch stock data and set form values
    useEffect(() => {
      dispatch(fetchStockById(stockId)).then((res) => {
        const { quantity, buy_price, sell_price,stock_date, ptiority, image } = res.payload;
        setValue("quantity", quantity); // Set form field value
        setValue("buy_price", buy_price); 
        setValue("sell_price", sell_price);
        setValue("stock_date", stock_date);
        setValue("ptiority", ptiority);
        setValue("company_due", company_due);
        setValue("image", image);// Set hidden field value (for image preview)
      });
    }, [dispatch, stockId, setValue]);
  
    // Handle file change for the brand image
    const handleUpdateImageChange = (e) => {
      setIsImageChanged(1);
      const file = e.target.files[0];
      setValue("image", file); // Update file in form
    };
  
    // Form submit handler
    const onSubmit = (data) => {
      const formData = new FormData();
      formData.append("quantity", data.quantity);
      formData.append("buy_price", data.buy_price);
      formData.append("sell_price", data.sell_price);
      formData.append("stock_date", date.stock_date);
      formData.append("priority", data.ptiority);
      formData.append("company_due", data.company_due);


      // Append image only if it's changed
      if (isImageChanged) {
        formData.append("image", data.image);
      }
  
      dispatch(updateStock({ id: stockId, updatedData: formData }));
    };
  
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#updateBrandModal"
        >
          Update Stock
        </button>
  
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
                  Update Stock
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
                      Stock Quantity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="customer name"
                      {...register("quantity", {
                        required: "Stock quantity is required",
                      })}
                    />
                    {errors.quantity && (
                      <p className="text-danger">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stockNameUpdate" className="form-label">
                      Buy Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="customer name"
                      {...register("buy_price", {
                        required: "stock buy price is required",
                      })}
                    />
                    {errors.buy_price && (
                      <p className="text-danger">{errors.buy_price.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="SellPrice" className="form-label">
                      Sell Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="sell price"
                      {...register("sell_price")}
                    />
                    {errors.sell_price && (
                      <p className="text-danger">{errors.sell_price.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock date" className="form-label">
                      Sell Price
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="stockNameUpdate"
                      placeholder="stoke date"
                      {...register("stock_date")}
                    />
                    {errors.stock_date && (
                      <p className="text-danger">{errors.stock_date.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="SellPrice" className="form-label">
                      Priority
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="Priotity"
                      {...register("priority")}
                    />
                    {errors.ptiority && (
                      <p className="text-danger">{errors.ptiority.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="SellPrice" className="form-label">
                      Company Due
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="customerNameUpdate"
                      placeholder="Priotity"
                      {...register("company_due")}
                    />
                    {errors.company_due && (
                      <p className="text-danger">{errors.company_due.message}</p>
                    )}
                  </div>
  
                  <div className="mb-3">
                    {/* This hidden input is only for storing the existing image URL */}
                    <input type="hidden" {...register("image")} />
                    <img
                      src={`${import.meta.env.VITE_URL}/uploads/stocks/${watch(
                        "image"
                      )}`}
                      alt="Customer Image"
                      className="rounded-circle w-25"
                    />
                  </div>
  
                  <div className="mb-3">
                    <label htmlFor="updateBrandImageFile" className="form-label">
                      stock Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="updateStockImageFile"
                      onChange={handleUpdateImageChange}
                    />
                    <p className="lead mt-2">
                      Please make sure the image ratio is 1050px * 600px!
                    </p>
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

export default UpdateStock