import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentById, updatePayment } from "../../Slicer/paymentTypeSlicer";
import { useForm } from "react-hook-form";

const UpdatePaymentTypes = () => {
  const dispatch = useDispatch();
  const dismissModal = useRef();
  
  // Fetch the payment type details based on the paymentTypeId
  const setPaymentId = useSelector((state) => state.paymentType.setPaymentId);
  
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();



  useEffect(() => {
    if (setPaymentId) {
      dispatch(fetchPaymentById(setPaymentId)).then((res) => {
        const { type,account_no, logo } = res.payload;
        setValue("type", type);
        setValue("account_no", account_no);
        setValue("logo", logo);
        setPreviewImage(`http://localhost:8000/storage/${logo}`);
        // setPreviewImage(`http://lb.app.mystrix.site/uploads/${image}`);
        
      });
    }
  }, [dispatch, setPaymentId, setValue]);


  const handleImageChange = (e) => {
    setIsImageChanged(true);
    const file = e.target.files[0];
    setValue("logo", file); // Update file in form
    setPreviewImage(URL.createObjectURL(file)); // Update preview
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // base64 encoded file
      reader.onerror = reject;
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };

  async function formDataToJsonWithFile(formData) {
    const obj = {};
  
    // Iterate over the FormData entries
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        // Convert the file to base64 and include it in the JSON object
        const base64 = await fileToBase64(value);
        obj[key] = base64;
      } else {
        obj[key] = value;
      }
    }
  
    return obj;
  }

  const onSubmit = async (data) => {


    const formData = new FormData();

    formData.append("type", data.type);
    formData.append("account_no", data.account_no);

    if (isImageChanged) {
      formData.append("logo", data.logo);
     
    }


    try {

      const jsonDataWithFile = await formDataToJsonWithFile(formData);
 

      dispatch(updatePayment({ id: setPaymentId, updatedData:jsonDataWithFile }))
      .then((val) => {
        console.log(val.payload);
        
        dismissModal.current.click();
      })
      .catch((err) => {
        console.error("Error updating paymentType:", err);
      });
     
    
      // alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
    }


    
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updatePaymentTypeModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updatePaymentTypeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updatePaymentTypeLabel">
                Update PaymentType
              </h5>
              <button
                type="button"
                ref={dismissModal}
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
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* PaymentType Name */}
                <div className="mb-3">
                  <label htmlFor="paymentTypeNameInput" className="form-label">
                    PaymentType Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.paymentType_name ? "is-invalid" : ""}`}
                    id="paymentTypeNameInput"
                    placeholder="E.g. PayPal"
                    {...register("type", {
                      required: "PaymentType name is required",
                      maxLength: {
                        value: 50,
                        message: "PaymentType name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.paymentType_name && (
                    <p className="invalid-feedback">{errors.paymentType_name.message}</p>
                  )}
                </div>

                {/* Account Number */}
                <div className="mb-3">
                  <label htmlFor="accountNumberInput" className="form-label">
                    Account No
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.account_no ? "is-invalid" : ""}`}
                    id="accountNumberInput"
                    {...register("account_no", {
                      required: "Account number is required",
                    })}
                  />
                  {errors.account_no && (
                    <p className="invalid-feedback">{errors.account_no.message}</p>
                  )}
                </div>

                {/* Current Logo Preview */}
                {previewImage && (
                  <div className="mb-3">
                    <label className="form-label">Current Logo</label>
                    <img
                      src={previewImage}
                      alt="Payment Logo"
                      className="img-thumbnail mt-2"
                      style={{ width: "150px" }}
                    />
                  </div>
                )}

                {/* Update Logo */}
                <div className="mb-3">
                  <label htmlFor="paymentLogoFile" className="form-label">
                    Payment Logo
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="paymentLogoFile"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <small className="form-text text-muted">
                    Please ensure the image ratio is 1050px * 600px.
                  </small>
                </div>

                {/* Modal Footer with Submit Button */}
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    data-bs-dismiss="modal"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePaymentTypes;
