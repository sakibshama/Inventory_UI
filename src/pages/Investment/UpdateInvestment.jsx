import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateInvestment, fetchInvestmentById } from "../../Slicer/InvestmentSlicer";
import { fetchPayment } from './../../Slicer/paymentTypeSlicer';

function UpdateInvestment() {
  const dispatch = useDispatch();
  const investmentId = useSelector((state) => state.investments.investmentId);
  const paymentTypes = useSelector((state) => state.paymentType.paymentType);
  const investmentData = useSelector((state) => state.investments.investments.find(investment => investment.id === investmentId));

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [deedImagePreview, setDeedImagePreview] = useState(null);

  // Fetch payment types
  useEffect(() => {
    dispatch(fetchPayment());
  }, [dispatch]);

  // Fetch and set investment data
  useEffect(() => {
    if (investmentId) {
      dispatch(fetchInvestmentById(investmentId)).then((res) => {
        const { investor_name, payment_id, amount, image, deed_image } = res.payload;
        setValue("investor_name", investor_name);
        setValue("amount", amount);
        setValue("payment_id", payment_id);
        
        // Handle image preview if available
        if (image) {
          setImagePreview(`${import.meta.env.VITE_BASE_URL}/storage/${image}`);
        }
        if (deed_image) {
          setDeedImagePreview(`${import.meta.env.VITE_BASE_URL}/storage/${deed_image}`);
        }
        
        // Set form fields if image data exists
        setValue("image", image || ""); 
        setValue("deed_image", deed_image || ""); 
      });
    }
  }, [dispatch, investmentId, setValue]);

  // Handle image file change for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create preview for image
    }
  };

  const handleDeedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDeedImagePreview(URL.createObjectURL(file)); // Create preview for deed image
    }
  };

  // Form submit handler
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("investor_name", data.investor_name);
    formData.append("amount", data.amount);
    formData.append("payment_id", data.payment_id);

    // Only append image if it's updated
    if (data.image && typeof data.image !== 'string') {
      formData.append("image", data.image[0]);
    }

    // Only append deed image if it's updated
    if (data.deed_image && typeof data.deed_image !== 'string') {
      formData.append("deed_image", data.deed_image[0]);
    }

    dispatch(updateInvestment({ id: investmentId, updatedData: data }));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updateBrandModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateBrandLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateBrandLabel">
                Update Investment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="investorNameUpdate" className="form-label">
                    Investor Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="investorNameUpdate"
                    placeholder="Investor Name"
                    {...register("investor_name", {
                      required: "Investor Name is required",
                    })}
                  />
                  {errors.investor_name && (
                    <p className="text-danger">{errors.investor_name.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="paymentTypeSelect" className="form-label">
                    Payment Type
                  </label>
                  <select
                    className="form-select"
                    {...register("payment_id", { required: "Payment Type is required" })}
                  >
                    <option value="">Select Payment Method</option>
                    {paymentTypes.map((paymentType) => (
                      <option key={paymentType.id} value={paymentType.id}>
                        {paymentType.type}
                      </option>
                    ))}
                  </select>
                  {errors.payment_id && (
                    <p className="text-danger">{errors.payment_id.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="amountUpdate" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amountUpdate"
                    placeholder="Amount"
                    {...register("amount", { required: "Amount is required" })}
                  />
                  {errors.amount && (
                    <p className="text-danger">{errors.amount.message}</p>
                  )}
                </div>

                {/* Image Preview and Upload */}
                <div className="mb-3">
                  <label htmlFor="imageFile" className="form-label">
                    Investment Image (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageFile"
                    {...register("image")}
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Investment Image Preview"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>

                {/* Deed Image Preview and Upload */}
                <div className="mb-3">
                  <label htmlFor="deedImageFile" className="form-label">
                    Deed Image (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="deedImageFile"
                    {...register("deed_image")}
                    onChange={handleDeedImageChange}
                  />
                  {deedImagePreview && (
                    <div className="mt-2">
                      <img
                        src={deedImagePreview}
                        alt="Deed Image Preview"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInvestment;
