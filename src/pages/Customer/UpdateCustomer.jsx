import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, fetchCustomerById } from "../../Slicer/CustomerSlicer";

function UpdateCustomer() {
  const dispatch = useDispatch();
  const setCustomerIdz = useSelector((state) => state.customers.setCustomerIdz);
  
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch customer data and set form values
  useEffect(() => {
    if (setCustomerIdz) {

      dispatch(fetchCustomerById(setCustomerIdz)).then((res) => {
        const { name, contact, address, image } = res.payload || {};
        setValue("name", name || "");
        setValue("contact", contact || "");
        setValue("address", address || "");
        setValue("image", image || "");

        // Set preview for existing customer image
        if (image) {
          setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${image}`);
        }
      });
    }
  }, [dispatch, setCustomerIdz, setValue]);

  // Handle file change for the customer image
  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageChanged(true);
      setValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Convert FormData to JSON including base64 file
  async function formDataToJsonWithFile(formData) {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        obj[key] = await fileToBase64(value);
      } else {
        obj[key] = value;
      }
    }
    return obj;
  }

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.contact);
    formData.append("address", data.address);
    formData.append("installment_date", data.installment_date);

    if (isImageChanged) {
      formData.append("image", data.image);
    }

    try {
      const jsonDataWithFile = await formDataToJsonWithFile(formData);
      const response = dispatch(updateCustomer({ id: setCustomerIdz, updatedData: jsonDataWithFile }));
      console.log(response.payload);
      
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updateCustomerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateCustomerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateCustomerLabel">Update Customer</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Customer Name */}
                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter customer name"
                    {...register("name", { required: "Customer name is required" })}
                  />
                  {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                </div>

                {/* Customer Contact */}
                <div className="mb-3">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                    placeholder="Enter customer contact"
                    {...register("contact", { required: "Contact is required" })}
                  />
                  {errors.contact && <p className="invalid-feedback">{errors.contact.message}</p>}
                </div>

                {/* Customer Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    placeholder="Enter customer address"
                    {...register("address", { required: "Address is required" })}
                  />
                  {errors.address && <p className="invalid-feedback">{errors.address.message}</p>}
                </div>
               

                {/* Customer Image Upload */}
                <div className="mb-3">
                  <label className="form-label">Customer Image</label>
                  <div className="mb-2">
                    {previewImage && <img src={previewImage} alt="Customer" className="w-25 mb-3" />}
                  </div>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={handleUpdateImageChange}
                  />
                  <small className="text-muted">Recommended size: 1050px x 600px</small>
                </div>

                {/* Form Actions */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Customer"}
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

export default UpdateCustomer;
