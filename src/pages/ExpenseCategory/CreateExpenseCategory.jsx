import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createExpenseCategorys} from "../../Slicer/ExpenseCategorySlicer";


function CreateExpenseCategory() {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [exCategoryData, setExCategoryData] = useState({
    name: "",
    type: ""
  });

  

  const handleCreateEx = () => {
    

    dispatch(createExpenseCategorys(exCategoryData))
      .then((res) => {
        // Close the modal after customer is created

        dimissModal.current.click();
        setExCategoryData({
          name: "",
          type: ""
        });
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
      Add Expense CategoryData
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
              Add Expense Category
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
               Name
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                placeholder="Category name"
                value={exCategoryData.name}
                onChange={(e) => {
                  setExCategoryData({ ...exCategoryData, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brandImageFile" className="form-label">
                Type
              </label>
              <input
                type="text"
                className="form-control"
                id="brandNameInput"
                placeholder="Expense Type"
                value={exCategoryData.type}
                onChange={(e)=>{setExCategoryData({...exCategoryData, type: e.target.value})}}
              />

            </div>
           
            
          
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCreateEx}
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

export default CreateExpenseCategory