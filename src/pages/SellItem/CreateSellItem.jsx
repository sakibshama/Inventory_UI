import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSellItem } from "../../Slicer/SellItemSlicer";
import {fetchProducts} from './../../Slicer/ProductSlicer';

function CreateSellItem() {
    const dispatch = useDispatch();
    const dimissModal = useRef();
    const [sellItemData, setSellItemData] = useState({
      sell_id: null,
      product_id: null,
      quantity: null,
      price: null,
      total_price: null,
      profit: null
    });

    const products = useSelector((state)=>state.product.products);
  
    
    useEffect(()=>{
      dispatch(fetchProducts());
    },[])

    const handleCreateSellItem = () => {
  
      dispatch(createSellItem(sellItemData))
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
        Add Sell Item
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
                Add a New Sell Item
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
            <div className="modal-body row">


            <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Select Product
                </label>


                <input list="encodings" value={sellItemData.product_id} onChange={(e) => { setSellItemData({ ...sellItemData, product_id: e.target.value }) }} class="form-control"/>
                  <datalist id="encodings" >
    
                  {products && products.map((val, index) => {
                      return (
                        <option key={index} value={val.id}>{val.name}</option>
                      )
                    })}
                  </datalist>

              </div>


              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Sell ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="customer name"
                  value={sellItemData.sell_id}
                  onChange={(e) => {
                    setSellItemData({ ...sellItemData, sell_id: e.target.value });
                  }}
                />
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Sell Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Quantity"
                  value={sellItemData.quantity}
                  onChange={(e) => {
                    setSellItemData({ ...sellItemData, quantity: e.target.value });
                  }}
                />
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Buy Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  value={sellItemData.price}
                  onChange={(e)=>{setSellItemData({...sellItemData, price: e.target.value})}}
                />
  
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="sell Item " className="form-label">
                  Total Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sell Item"
                  value={sellItemData.total_price}
                  onChange={(e)=>{setSellItemData({...sellItemData, total_price: e.target.value})}}
                />
  
              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="sell Item " className="form-label">
                  Total Profit
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sell Item"
                  value={sellItemData.profit}
                  onChange={(e)=>{setSellItemData({...sellItemData, profit: e.target.value})}}
                />
  
              </div>
            
              
             
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateSellItem}
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

export default CreateSellItem