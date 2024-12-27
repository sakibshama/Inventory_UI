import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateSupplier, fetchSupplierById } from "../../Slicer/SupplierSlicer";

const UpdateSupplier = () => {
  const dispatch = useDispatch();
  const supplierId = useSelector((state) => state.supplier.setSupplierId);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState(""); // State for image preview

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch supplier data and set form values
  useEffect(() => {
    dispatch(fetchSupplierById(supplierId)).then((res) => {
      const { name, contact, address, image } = res.payload;
      setValue("name", name || "");
      setValue("contact", contact || "");
      setValue("address", address || "");
      setValue("image", image || "");
      // setPreviewImage(image || ""); // Set preview image if 
      setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${image}`);
    });
  }, [dispatch, supplierId, setValue]);

  // Handle file change for the supplier image
  const handleUpdateImageChange = (e) => {
    setIsImageChanged(true);
    const file = e.target.files[0];
    setValue("image", file); // Update file in form
    setPreviewImage(URL.createObjectURL(file)); // Set preview of the new image
  };

  // Convert form data to JSON with file (base64 encoded)
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // base64 encoded file
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function formDataToJsonWithFile(formData) {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        const base64 = await fileToBase64(value);
        obj[key] = base64;
      } else {
        obj[key] = value;
      }
    }
    return obj;
  }

  // Form submit handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.contact);
    formData.append("address", data.address);

    // Append image only if it's changed
    if (isImageChanged) {
      formData.append("image", data.image);
    }

    try {
      const jsonDataWithFile = await formDataToJsonWithFile(formData);
      dispatch(updateSupplier({ id: supplierId, updatedData: jsonDataWithFile }));
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="updateSupplierModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateSupplierLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateSupplierLabel">
                Update Supplier
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Supplier Name */}
                <div className="mb-3">
                  <label htmlFor="supplierName" className="form-label">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="supplierName"
                    placeholder="Enter supplier name"
                    {...register("name", {
                      required: "Supplier name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
                </div>

                {/* Supplier Contact */}
                <div className="mb-3">
                  <label htmlFor="supplierContact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                    id="supplierContact"
                    placeholder="Enter supplier contact"
                    {...register("contact", {
                      required: "Contact is required",
                    })}
                  />
                  {errors.contact && (
                    <p className="invalid-feedback">{errors.contact.message}</p>
                  )}
                </div>

                {/* Supplier Address */}
                <div className="mb-3">
                  <label htmlFor="supplierAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="supplierAddress"
                    placeholder="Enter supplier address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && (
                    <p className="invalid-feedback">{errors.address.message}</p>
                  )}
                </div>

                {/* Supplier Image */}
                <div className="mb-3">
                  <label htmlFor="supplierImage" className="form-label">
                    Supplier Image
                  </label>
                  <div className="mb-2">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Supplier"
                        className="w-25"
                      />
                    )}
                    
                  </div>
                  <input
                    className="form-control"
                    type="file"
                    id="supplierImage"
                    onChange={handleUpdateImageChange}
                  />
                  <small className="text-muted">
                    Recommended size: 1050px x 600px
                  </small>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    data-bs-dismiss="modal"
                  >
                    {isSubmitting ? "Updating..." : "Update Supplier"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSupplier;
