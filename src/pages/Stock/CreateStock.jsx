import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createStock } from "../../Slicer/StockSlicer";

function CreateAllStock() {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [stockData, setStockData] = useState({
    quantity: "",
    buy_price: "",
    sell_price: "",
    stock_date: "",
    priority: "",
    //TODO:: create backend of company due
    company_due:"",
    image: null,
    status: "1",
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setCustomerData({ ...brandData, image: file });
  };

  const handleCreateStock = () => {
    const formData = new FormData();
    formData.append("quantity", stockData.quantity);
    formData.append("buy_price", stockData.buy_price);
    formData.append("sell_price", stockData.sell_price);
    formData.append("stock_date", stockData.stock_date);
    formData.append("priority", stockData.priority);
    formData.append("image", stockData.image)
    formData.append("status", stockData.status);

    dispatch(createStock(formData))
      .then((res) => {
        // Close the modal after customer is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating customer:", err);
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
      Add Stock
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
              Add a New Stock
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
              <label htmlFor="brandNameInput" className="form-label">
                Stock Quantity
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                placeholder="Stock Quantity"
                value={stockData.quantity}
                onChange={(e) => {
                  setStockData({ ...stockData, quantity: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Buy Price
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                value={stockData.buy_price}
                onChange={(e)=>{setCustomerData({...stockData, buy_price: e.target.value})}}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="stock " className="form-label">
                Buy Price
              </label>
              <input
                type="text"
                className="form-control"
                id="stock"
                value={stockData.sell_price}
                onChange={(e)=>{setCustomerData({...stockData, sell_price: e.target.value})}}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Stock Date
              </label>
              <input
                type="date"
                className="form-control"
                id="brandNameInput"
                value={stockData.stock_date}
                onChange={(e)=>{setCustomerData({...stockData, stock_date: e.target.value})}}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Priority
              </label>
              <input
                type="number"
                className="form-control"
                id="brandNameInput"
                value={stockData.priority}
                onChange={(e)=>{setCustomerData({...stockData, priority: e.target.value})}}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Priority
              </label>
              <input
                type="number"
                className="form-control"
                id="companydueinput"
                value={stockData.company_due}
                onChange={(e)=>{setCustomerData({...stockData, company_due: e.target.value})}}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="stockImageFile" className="form-label">
                Customer Image
              </label>
              <input
                className="form-control"
                type="file"
                id="brandImageFile"
                onChange={handleImage}
              />

            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCreateStock}
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

export default CreateAllStock