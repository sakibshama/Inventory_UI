import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createPayment } from "../../Slicer/paymentTypeSlicer";

const CreatePaymentTypes = () => {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [paymentTypeData, setPaymentTypeData] = useState({
    paymentType_name: "",
    account_no: "",
    logo: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPaymentTypeData({ ...paymentTypeData, logo: file });
  };



  const handleCreatePaymentType = () => {

    dispatch(createPayment(paymentTypeData))
      .then((res) => {
        // Close the modal after paymentType is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating paymentType:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createPaymentTypeModal"
      >
        Add PaymentType
      </button>

      <div
        className="modal fade"
        id="createPaymentTypeModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createPaymentTypeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createPaymentTypeLabel">
                Add a New PaymentType
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
                <label htmlFor="paymentTypeNameInput" className="form-label">
                  PaymentType
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="paymentTypeNameInput"
                  placeholder="E.g. Asus"
                  value={paymentTypeData.type}
                  onChange={(e) => {
                    setPaymentTypeData({
                      ...paymentTypeData,
                      type: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="paymentTypeNameInput" className="form-label">
                  ACCOUNT NO
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="accountNumberInput"
                  placeholder="E.g. Asus"
                  value={paymentTypeData.account_no}
                  onChange={(e) => {
                    setPaymentTypeData({
                      ...paymentTypeData,
                      account_no: e.target.value,
                    });
                  }}
                />
              </div>


              <div className="mb-3">
                <label htmlFor="categoryImageFile" className="form-label">
                  Logo
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="paymentLogoFile"
                  onChange={handleImageChange}
                />
                <p className="lead mt-2">
                  Please make sure the image ratio is 1050px * 600px!
                </p>
              </div>




            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreatePaymentType}
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

export default CreatePaymentTypes;
