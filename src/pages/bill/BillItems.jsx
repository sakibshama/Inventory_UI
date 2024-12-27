import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById,fetchProducts } from "../../Slicer/ProductSlicer"; // Import the action
import { fetchAllStockById,fetchAllStocks } from "../../Slicer/AllStockSlicer";

const BillItems = () => {
  const dispatch = useDispatch();

  // Local state for bill items
  const [billItems, setBillItems] = useState([
    { product_id: "", sell_price: null, quantity: null, total_price: null },
  ]);

  // Get fetched product details from Redux store
  const products = useSelector((state) => state.product.products);
  const stocks=useSelector((state)=>state.allstocks.allstocks)
console.log("ok",stocks);

  useEffect(()=>{
    dispatch(fetchProducts())    
    dispatch(fetchAllStocks())
  },[dispatch])

  useEffect(()=>{   
    dispatch(fetchAllStocks())
  },[dispatch])



  // Calculate total bill amount
  const totalBillAmount = billItems.reduce(
    (sum, item) => sum + (item.total_price || 0),
    0
  );

  const handleInputChange = async (index, field, value) => {
    const updatedItems = [...billItems];
    updatedItems[index][field] = value;

    // Fetch and set sell_price when product_id changes
    if (field === "product_id") {
      let fetchedProduct = dispatch(fetchProductById(value)); // Dispatch action to fetch product details
      console.log("here", value);
      const selectedStock = stocks.find((stock) => stock.product_id === value);
      // if (fetchedProduct?.id === value) {
      //   updatedItems[index].sell_price = fetchedProduct.sell_price;
      //   updatedItems[index].total_price =
      //     fetchedProduct.sell_price * (updatedItems[index].quantity || 0);
      // }

      if (selectedStock) {
        updatedItems[index].sell_price = selectedStock.sell_price;
        updatedItems[index].total_price =
          selectedStock.sell_price * (updatedItems[index].quantity || 0);
      } else {
        updatedItems[index].sell_price = 0;
        updatedItems[index].total_price = 0;
      }

    }

    // Recalculate total_price when sell_price or quantity changes
    if (field === "sell_price" || field === "quantity") {
      const price = parseFloat(updatedItems[index].sell_price || 0);
      const quantity = parseFloat(updatedItems[index].quantity || 0);
      updatedItems[index].total_price = price * quantity;
    }

    setBillItems(updatedItems);
  };

  const addBillItem = () => {
    setBillItems([
      ...billItems,
      { product_id: "", sell_price: 0, quantity: 0, total_price: 0 },
    ]);
  };

  const removeBillItem = (index) => {
    const updatedItems = billItems.filter((_, i) => i !== index);
    setBillItems(updatedItems);
  };

  return (
    <div className="container mt-4">
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
              value={item.sell_price}
              onChange={(e) =>
                handleInputChange(index, "sell_price", e.target.value)
              }
              className="form-control"
            />
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
    </div>
  );
};

export default BillItems;
