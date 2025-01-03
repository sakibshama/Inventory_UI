import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, fetchProducts } from "../../Slicer/ProductSlicer"; // Import the action
import { fetchAllStockById, fetchAllStocks } from "../../Slicer/AllStockSlicer";
import { createGenerateBill, setGenerateBillIdz } from './../../Slicer/GenerateBillSlicer'
import AlertMessage from "./AlertMessage";
import axios from "axios";
import { fetchUsers } from '../../Slicer/UserSlicer';
import BillTransaction from "./BillTransaction";
import { Link } from "react-router-dom";

const BillItems = () => {
  const dispatch = useDispatch();

  const [stockOutAnim, setstockOutAnim] = useState(false);

  const [userId, setUserId] = useState(null);
  const [paidAmount, setPaidAmount] = useState(null);

  // Local state for bill items
  const [billItems, setBillItems] = useState([
    { product_id: "", price: null, quantity: null, total_price: null, stock_quantity: 0, avg: 0 },
  ]);

  const fetchstockByProductId = (id) => {
    const API_URL = `${import.meta.env.VITE_BASE_URL}/api/products/${id}/stocks`;
    axios.get(API_URL).then((res) => {
      let response = res.data;
      console.log(response);
      console.log(typeof (response));
      return response;

    });

  }




  // Get fetched product details from Redux store
  const products = useSelector((state) => state.product.products);
  const stocks = useSelector((state) => state.allstocks.allstocks);
  const customer_id = useSelector((state) => state.generateBills.customer_id);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchAllStocks())
    dispatch(fetchUsers());
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAllStocks())
  }, [dispatch])


  useEffect(() => {
    console.log('customer', customer_id);

  }, [customer_id])




  // Calculate total bill amount
  const totalBillAmount = billItems.reduce(
    (sum, item) => sum + (item.total_price || 0),
    0
  );



  const handleInputChange = async (index, field, value) => {
    // Create a deep copy of billItems to avoid direct mutation
    const updatedItems = [...billItems];

    // Update the specific field for the given index
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Fetch and set sell_price when product_id changes
    if (field === "product_id") {
      try {
        // Fetch stock details using the product ID
        const API_URL = `${import.meta.env.VITE_BASE_URL}/api/products/${value}/stocks`;

        // Wait for the API response
        const response = await axios.get(API_URL);
        const mystocks = response.data;

        console.log("Fetched mystocks:", mystocks); // Logs fetched data correctly

        let sold_price = 0;

        for (let x = 0; x < mystocks.length; x++) {
          sold_price += parseFloat(mystocks[x].sell_price);
        }

        let avg = sold_price / mystocks.length;
        console.log(avg);
        updatedItems[index].avg = avg || 0;


        // Assuming `mystocks` is an array, you can access the last stock item
        if (mystocks && mystocks.length > 0) {
          const selectedStock = mystocks[mystocks.length - 1]; // Get the last stock object
          updatedItems[index].price = selectedStock.sell_price || 0;
          updatedItems[index].total_price =
            selectedStock.sell_price * (updatedItems[index].quantity || 0);
        } else {
          updatedItems[index].price = 0;
          updatedItems[index].total_price = 0;
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }

      // Additional API call for product details (optional)
      try {
        const response = await dispatch(fetchProductById(value));
        const stockDetails = response.payload;

        if (stockDetails) {
          updatedItems[index].stock_quantity = stockDetails.quantity || 0;

        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    // Recalculate total_price when sell_price or quantity changes
    if (field === "price" || field === "quantity") {
      const price = parseFloat(updatedItems[index].price || 0);
      const quantity = parseFloat(updatedItems[index].quantity || 0);
      updatedItems[index].total_price = price * quantity;
      if (quantity > updatedItems[index].stock_quantity) {
        updatedItems[index].quantity = 0;
        updatedItems[index].total_price = 0;
        setstockOutAnim(true);
        setTimeout(() => {
          setstockOutAnim(false);
        }, 3000);
      }

    }

    // Update the state with the new array
    setBillItems(updatedItems);

    // Log the updated state after it's set
    console.log("Updated billItems:", updatedItems);
  };


  const addBillItem = () => {
    setBillItems([
      ...billItems,
      { product_id: "", price: 0, quantity: 0, total_price: 0, stock_quantity: 0, avg: 0 },
    ]);
  };

  const removeBillItem = (index) => {
    const updatedItems = billItems.filter((_, i) => i !== index);
    setBillItems(updatedItems);
  };



  const generateBill = () => {
    const items = billItems.map(({ stock_quantity, avg, total_price, ...rest }) => rest);
    // console.log(items);

    const billData = {
      items: items,
      user_id: userId,
      customer_id: customer_id,
      paid_amount: paidAmount,
      discount: 0
    }

    console.log(billData);

    dispatch(createGenerateBill(billData)).then((res) => {
      console.log(res.payload.bill_id);
      dispatch(setGenerateBillIdz(res.payload.bill_id));
      
    });


  }

  return (
    <div className="container mt-4">

      {stockOutAnim ? <AlertMessage message="Insufficient Stock" /> : ''}

      <h2 className="text-center mb-4">Bill Items</h2>
      {billItems.map((item, index) => (
        <div key={index} className="row align-items-center mb-3">
          {/* Product ID with Datalist */}
          <div className="col-md-3">
            <input
              type="text"
              list={`product-options-${index}`}
              placeholder="Select Product"
              value={item.product_id}
              onChange={(e) =>
                handleInputChange(index, "product_id", e.target.value)
              }
              className="form-control"
            />
            <datalist id={`product-options-${index}`}>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </datalist>
          </div>

          {/* Sell Price */}
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Sell Price"
              value={item.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              className="form-control"
            />

            <span className="text-success fw-bold">Avg: {item.avg}</span>
          </div>

          {/* Quantity */}
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleInputChange(index, "quantity", e.target.value)
              }
              className="form-control"
            />

            <span className="text-danger fw-bold">Available Stock: {item.stock_quantity}</span>
          </div>

          {/* Total Price (Read-Only) */}
          <div className="col-md-3">
            <input
              type="number"
              placeholder="Total Price"
              value={item.total_price}
              readOnly
              className="form-control bg-light"
            />
          </div>

          {/* Remove Button */}
          <div className="col-md-2 text-center">
            <button
              onClick={() => removeBillItem(index)}
              className="btn btn-danger"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add Item Button */}
      <div className="text-center">
        <button onClick={addBillItem} className="btn btn-success mt-3">
          Add Item
        </button>
      </div>

      {/* Total Bill Amount */}
      <div className="text-center mt-4">
        <h4>
          Total Bill Amount: <span className="text-primary">${totalBillAmount.toFixed(2)}</span>
        </h4>
      </div>



      <div className="text-center my-1 row">

        <div className="mb-3 col-md-6 col-sm-12">
          <label className="form-label">Paid Amount</label>
          <input type="text" className="form-control" 
          value={paidAmount}
          onChange={(e)=>{setPaidAmount(e.target.value)}}
          placeholder="Paid Amount"/>
        </div>

        <div className="mb-3 col-md-6 col-sm-12">
          <label htmlFor="User"></label>
          <select className="form-control" onChange={(e) => { setUserId(e.target.value) }}>
            <option>Select User</option>
            {users.map((val, index) => {
              return <option key={index} value={val.id}>{val.name}</option>
            })}
          </select>
        </div>

      </div>

      <div className="b-3">
        <BillTransaction/>
      </div>

      
      <div className="text-center">
        <button className="btn btn-dark " disabled={customer_id ? false : true} onClick={generateBill}>Generate Bill</button>
        
      </div>
      {/* <Link to="/bill/download/pdf"></Link> */}

    </div>
  );
};

export default BillItems;
