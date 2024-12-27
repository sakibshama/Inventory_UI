
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createSupplier } from "../../Slicer/SupplierSlicer";

const CreateSupplier = () => {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [supplierData, setSupplierData] = useState({
    name: "",
    contact: "",
    address: "",
    image: null,

    status: "1",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSupplierData({ ...supplierData, image: file });
  };

  const handleCreateSupplier = () => {
    const formData = new FormData();
    formData.append("name", supplierData.name);
    formData.append("contact", supplierData.contact);
    formData.append("address", supplierData.address);
    formData.append("image", supplierData.image);
    formData.append("status", supplierData.status);

    dispatch(createSupplier(formData))
      .then((res) => {
        // Close the modal after supplier is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating supplier:", err);
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
        Add Supplier
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
                Add a New Supplier
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
                <label htmlFor="supplierNameInput" className="form-label">
                  Supplier Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supplierNameInput"
                  placeholder="E.g. Asus"
                  value={supplierData.name}
                  onChange={(e) => {
                    setSupplierData({
                      ...supplierData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="supplierNameInput" className="form-label">
                  Supplier contact
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="supplierNameInput"
                  placeholder="E.g. Asus"
                  value={supplierData.contact}
                  onChange={(e) => {
                    setSupplierData({
                      ...supplierData,
                      contact: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="supplierNameInput" className="form-label">
                  Supplier address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supplierNameInput"
                  placeholder="E.g. Asus"
                  value={supplierData.address}
                  onChange={(e) => {
                    setSupplierData({
                      ...supplierData,
                      address: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="supplierImageFile" className="form-label">
                  Supplier Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="supplierImageFile"
                  onChange={handleImageChange}
                />
                <p className="lead mt-2">
                  Please make sure the image ratio is 1050px * 600px!
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateSupplier}
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

export default CreateSupplier;
