import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Slicer/ProductSlicer";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {fetchCategory} from './../../Slicer/CategorySlicer'
import {fetchBrands} from './../../Slicer/BrandSlicer'

const CreateProduct = () => {
  const dispatch = useDispatch();

  const Category = useSelector((state)=> state.category.Category);
  const brnads = useSelector((state)=> state.brands.brands);


  useEffect(()=>{
    dispatch(fetchCategory());
    dispatch(fetchBrands());
  },[])


  const dimissModal = useRef();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category_id: "",
    brand_id: "",
    status: true,
  });

  const handleCreateProduct = () => {


    dispatch(createProduct(productData))
      .then((res) => {
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating product:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createProductModal"
      >
        Add Product
      </button>

      <div
        className="modal fade"
        id="createProductModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createProductLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createProductLabel">
                Add a New Product
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
                <label htmlFor="productNameInput" className="form-label">
                  Product Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productNameInput"
                  placeholder="E.g. Asus"
                  value={productData.name}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="productDiscriptionInput" className="form-label">
                  Product Description
                </label>
                <input
                className="form-control"
                  value={productData.description}
                  placeholder="Description"
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    });
                  }}
                />
              </div>


              <div className="mb-3">
                <label htmlFor="productNameInput" className="form-label">
                  Category
                </label>
                
                <select  className="form-select" onChange={(e)=>{setProductData({...productData, category_id:e.target.value})}}>
                  <option value="">Select Category</option>
                  {
                    Category.map((category, index) => (
                      <option key={index} value={category.id}>{category.name}</option>
                      ))
                      
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="productNameInput" className="form-label">
                  Brand
                </label>
                
                <select  className="form-select" onChange={(e)=>{setProductData({...productData, brand_id:e.target.value})}}>
                  <option value="">Select Brand</option>
                  {
                    brnads.map((brand, index) => (
                      <option key={index} value={brand.id}>{brand.name}</option>
                      ))
                      
                  }
                </select>
              </div>










            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateProduct}
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
  );
};

export default CreateProduct;
