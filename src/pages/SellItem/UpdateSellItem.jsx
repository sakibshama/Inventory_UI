import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateSellItem, fetchSellItemById } from "../../Slicer/SellItemSlicer";
import Container from "quill/blots/container";
function UpdateSellItem() {
  const dispatch = useDispatch();
  const sellItemId = useSelector((state) => state.sellItems.sellItemId);

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch sellItem data and set form values
  useEffect(() => {
    console.log(sellItemId);
    
    dispatch(fetchSellItemById(sellItemId)).then((res) => {
      const { quantity, total_price, price, profit, stock_id, comission, container_id ,product_id, sell_id} = res.payload;
      setValue("quantity", quantity); // Set form field value
      setValue("price", price);
      setValue("sell_id", sell_id);
      setValue("total_price", total_price);
      setValue("profit", profit);
      setValue("product_id", product_id);
      setValue("stock_id", stock_id);
      setValue("comission", comission);
      setValue("container_id", container_id);

    });
  }, [dispatch, sellItemId, setValue]);



  // Form submit handler
  const onSubmit = (data) => {


    dispatch(updateSellItem({ id: sellItemId, updatedData: data }));
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
                Update Sell Item
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
                  <label htmlFor="sellItemNameUpdate" className="form-label">
                    Sell ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Sell Id"
                    {...register("sell_id", {
                      required: "Sell Id is required",
                    })}
                  />
                  {errors.sell_id && (
                    <p className="text-danger">{errors.sell_id.message}</p>
                  )}
                </div>


                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="customer name"
                    {...register("quantity", {
                      required: "Sell Item quantity is required",
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-danger">{errors.quantity.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="sellItemNameUpdate" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="customer name"
                    {...register("price", {
                      required: "Price buy price is required",
                    })}
                  />
                  {errors.buy_price && (
                    <p className="text-danger">{errors.price.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="sellItemNameUpdate" className="form-label">
                    Total Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="customer name"
                    {...register("total_price", {
                      required: "Total price is required",
                    })}
                  />
                  {errors.total_price && (
                    <p className="text-danger">{errors.total_price.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="sellItemNameUpdate" className="form-label">
                    Comission
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="comission"
                    {...register("comission", {
                      required: "Comisssion is required",
                    })}
                  />
                  {errors.comission && (
                    <p className="text-danger">{errors.comission.message}</p>
                  )}
                </div>

              

                <div className="mb-3">
                  <label htmlFor="sellItemNameUpdate" className="form-label">
                    Product ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="product"
                    {...register("product_id", {
                      required: "product Id is required",
                    })}
                  />
                  {errors.product_id && (
                    <p className="text-danger">{errors.product_id.message}</p>
                  )}
                </div>


                <div className="mb-3">
                  <label htmlFor="SellPrice" className="form-label">
                    Container
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Container"
                    {...register("container_id")}
                  />
                  {errors.container_id && (
                    <p className="text-danger">{errors.container_id.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="SellPrice" className="form-label">
                    Stock
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Stock"
                    {...register("stock_id")}
                  />
                  {errors.stock_id && (
                    <p className="text-danger">{errors.stock_id.message}</p>
                  )}
                </div>
               

                <div className="mb-3">
                  <label htmlFor="SellPrice" className="form-label">
                    Profit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Profit"
                    {...register("profit")}
                  />
                  {errors.profit && (
                    <p className="text-danger">{errors.profit.message}</p>
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

export default UpdateSellItem