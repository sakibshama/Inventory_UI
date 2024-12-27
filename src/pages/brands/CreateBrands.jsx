import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBrand } from "../../Slicer/BrandSlicer";

const CreateBrands = () => {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [brandData, setBrandData] = useState({
    name: "",
    logo: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBrandData({ ...brandData, logo: file });
  };

  const handleCreateBrand = () => {

    dispatch(createBrand(brandData))
      .then((res) => {
        // Close the modal after brand is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating brand:", err);
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
        Add Brand
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
                Add a New Brand
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
                  Brand Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brandNameInput"
                  placeholder="E.g. Asus"
                  value={brandData.name}
                  onChange={(e) => {
                    setBrandData({ ...brandData, name: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandImageFile" className="form-label">
                  Brand Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="brandImageFile"
                  onChange={handleImageChange}
                />
                <p className="lead mt-2">
                  Please make sure the image ratio is 1050px * 600px!
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateBrand}
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

export default CreateBrands;
