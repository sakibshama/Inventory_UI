import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAllStock } from "../../Slicer/AllStockSlicer";
import { createStock } from "../../Slicer/StockSlicer";
import { fetchProducts,updateProduct, fetchProductById } from './../../Slicer/ProductSlicer';
import {fetchSuppliers} from './../../Slicer/SupplierSlicer';
import {fetchPayment} from './../../Slicer/paymentTypeSlicer';
import {setStockId} from './../../Slicer/TransactionSlicer';
import StockTransaction from './StockTransaction';
import Loader from "./Loader";
import {fetchContainer} from '../../Slicer/ContainerSlicer';




function CreateStock() {




  const [isLoading, setIsLoading] = useState(false);



  
  const dispatch = useDispatch();
  const dimissModal = useRef();

  const [paidError, setPaidError] = useState("");
  const [addBtnStatus, setAddBtnStatus] = useState("btn btn-primary");
  const [suggestion, setSuggestion] = useState("");


  const products = useSelector((state) => state.product.products);
  const suppliers = useSelector((state) => state.supplier.suppliers);
  const Container = useSelector((state) => state.containers.Container);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSuppliers());
    dispatch(fetchContainer());
  }, []);





  const [stockData, setStockData] = useState({
    quantity: null,
    buy_price: null,
    sell_price: null,
    stock_date: null,
    product_id: null,
    supplier_id: null,
    container_id: null,
    comission:null,
    paid_amount:null,
    total:null,
    dues: null,
    image: null
  });

 





  useEffect(()=>{
    if(stockData.buy_price>0 && stockData.quantity>0){
      const total = stockData.buy_price * stockData.quantity;
      setStockData({...stockData, total:total});
    }
  },[stockData.buy_price, stockData.quantity]);

  useEffect(()=>{
    if(stockData.total>0 && stockData.paid_amount>=0){
      if(stockData.paid_amount > stockData.total){
        setStockData({...stockData, dues:0});
        setPaidError("Paid Amount Should Be Less Than Total Amount");
        setAddBtnStatus("btn btn-primary disabled");
        
      }else{
        const dues = stockData.total - stockData.paid_amount;
        setStockData({...stockData, dues:dues});
        setPaidError("");
        setAddBtnStatus("btn btn-primary");
      }
      
    }




    if((stockData.total>0) && (stockData.paid_amount>0) && (stockData.paid_amount <= stockData.total) && (stockData.total != (stockData.buy_price*stockData.quantity))){

      let per_unit = stockData.total/stockData.quantity;
      setSuggestion(`Prices are not in Shape. It Should Be ${per_unit}`);
    }
    else{
      setSuggestion("");
    }

  },[stockData.total, stockData.paid_amount]);


  const handleImage = (e) => {
    const file = e.target.files[0];
    setStockData({ ...stockData, image: file });
  };


  const handleCreateStock = () => {

    setIsLoading(true);

    let allstockData = stockData;

    console.log(stockData);
    


    dispatch(createStock(stockData))
      .then((res) => {
        // Close the modal after customer is created
        // console.log(res.payload.id);


        allstockData = {...allstockData,stock_id:res.payload.id};
  
        // console.log(allstockData);
        
        dispatch(createAllStock(allstockData)).then((res)=>{

          setStockId(res.payload.stock_id);


          let quantity1 = parseInt(res.payload.quantity);




          dispatch(fetchProductById(res.payload.product_id)).then((res)=>{

            let { name, description, category_id, brand_id, quantity } = res.payload;

            let upData = res.payload;

            upData.quantity+=quantity1;



            dispatch(updateProduct({id:res.payload.id, updatedData:upData})).then((res)=>{
              console.log(res.payload);
            })
            
            
          })
          






          setIsLoading(false);

        });
        
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
            <div className="modal-body row">



              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandNameInput" className="form-label">
                  Select Product
                </label>


                <input list="encodings" placeholder="Choose Product" value={stockData.produt_id} onChange={(e) => { setStockData({ ...stockData, product_id: e.target.value }) }} class="form-control"/>
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
                  Select Container
                </label>


                <input list="encodingsz" placeholder="Choose Container" value={stockData.container_id} onChange={(e) => { setStockData({ ...stockData, container_id: e.target.value }) }} class="form-control"/>
                  <datalist id="encodingsz" >
    
                  {Container && Container.map((val, index) => {
                      return (
                        <option key={index} value={val.id}>{val.shipment_id}</option>
                      )
                    })}
                  </datalist>

              </div>

              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Supplier
                </label>
                <select
                  type="number"
                  className="form-select"
                  
                  onChange={(e) => { setStockData({ ...stockData, supplier_id: e.target.value }) }}
                >
                  <option value="">Select Supplier</option>
                  {suppliers && suppliers.map((val, index)=>{
                    return(
                      <option key={index} value={val.id}>{val.name}</option>
                    )
                  })}

                </select>

              </div>


              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Stock Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="brandNameInput"
                  value={stockData.stock_date}
                  onChange={(e) => { setStockData({ ...stockData, stock_date: e.target.value }) }}
                />

              </div>








              <div className="mb-3 col-md-6 col-sm-12">
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
             
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Buying Price (Per Unit)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Buying Price"
                  value={stockData.buy_price}
                  onChange={(e) => { setStockData({ ...stockData, buy_price: e.target.value }) }}
                />
                <span className="text-warning px-1 py-1 d-block">{suggestion}</span>

              </div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="stock " className="form-label">
                  Selling Price (Per Unit)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  placeholder="Selling price"
                  value={stockData.sell_price}
                  onChange={(e) => { setStockData({ ...stockData, sell_price: e.target.value }) }}
                />

              </div>
             


              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Total Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Total Amount"
                  value={stockData.total}
                  onChange={(e) => { setStockData({ ...stockData, total: e.target.value }) }}
                />

              </div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Paid Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="Paid Amount"
                  value={stockData.paid_amount}
                  onChange={(e) => { setStockData({ ...stockData, paid_amount: e.target.value }) }}
                />
                <span className="text-danger px-1 py-1 d-block">{paidError}</span>

              </div>
              
             
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Dues (If Any)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="companydueinput"
                  placeholder="Dues"
                  readOnly
                  value={stockData.dues}
                  onChange={(e) => { setStockData({ ...stockData, dues: e.target.value }) }}
                />

              </div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="brandImageFile" className="form-label">
                  Comission
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="companydueinput"
                  placeholder="Comission"
                  value={stockData.comission}
                  onChange={(e) => { setStockData({ ...stockData, comission: e.target.value }) }}
                />

              </div>
              <div className="mb-3 col-md-6 col-sm-12">
                <label htmlFor="stockImageFile" className="form-label">
                  Stock Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="brandImageFile"
                  onChange={handleImage}
                />

              </div>


              <div className="mb-3 col-md-12 col-sm-12">
                <label htmlFor="stockImageFile" className="form-label">
                  Payment Methods
                </label>

                  <br />
                <div className="mb-3">
                  <StockTransaction />
                </div>

              </div>

            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateStock}
                type="button"
                className={addBtnStatus}
                
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

export default CreateStock