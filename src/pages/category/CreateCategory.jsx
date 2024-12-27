import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import  {createCategory}  from "./../../Slicer/CategorySlicer";

const CreateCategorys = () => {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [categoryData, setcategoryData] = useState({
    name: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setcategoryData({ ...categoryData, image: file });
  };

  const handleCreatecategory = () => {
    console.log(categoryData);

    dispatch(createCategory(categoryData))
      .then((res) => {
        console.log(res);
        
        // Close the modal after category is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating category:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createcategoryModal"
      >
        Add category
      </button>

      <div
        className="modal fade"
        id="createcategoryModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createcategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createcategoryLabel">
                Add a New category
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
                <label htmlFor="categoryNameInput" className="form-label">
                  category Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryNameInput"
                  placeholder="E.g. Asus"
                  value={categoryData.name}
                  onChange={(e) => {
                    setcategoryData({ ...categoryData, name: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryImageFile" className="form-label">
                  category Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="categoryImageFile"
                  onChange={handleImageChange}
                />
                <p className="lead mt-2">
                  Please make sure the image ratio is 1050px * 600px!
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreatecategory}
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

export default CreateCategorys;
