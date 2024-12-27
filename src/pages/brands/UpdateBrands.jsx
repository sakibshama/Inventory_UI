import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandById, updateBrand } from "../../Slicer/BrandSlicer";

const UpdateBrands = () => {
  const dispatch = useDispatch();
  const setBrandId = useSelector((state) => state.brands.setBrandId);
  
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Convert file to base64 (same as UpdateCategory)
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // base64 encoded file
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch brand data and set form values
  useEffect(() => {
    if (setBrandId) {
      dispatch(fetchBrandById(setBrandId)).then((res) => {
        const { name, logo } = res.payload;
        setValue("name", name);
        setValue("logo", logo);
        setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${logo}`);
      });
    }
  }, [dispatch, setBrandId, setValue]);

  // Handle file change for the brand image
  const handleUpdateImageChange = (e) => {
    setIsImageChanged(true);
    const file = e.target.files[0];
    setValue("logo", file); // Update file in form
    setPreviewImage(URL.createObjectURL(file)); // Update preview
  };

  // Form submit handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (isImageChanged) {
      formData.append("logo", data.logo);
    }

    try {
      const jsonDataWithFile = await formDataToJsonWithFile(formData);

      const res = dispatch(updateBrand({ id: setBrandId, updatedData: jsonDataWithFile }));
      res.then((val) => {
        console.log(val.payload);
        // Add success notification or modal close logic
      });
    } catch (error) {
      console.error("Error updating brand:", error);
    }
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
                Update Brand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                encType="multipart/form-data"
                method="PUT"
              >
                {/* Brand Title */}
                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Brand Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="brandNameUpdate"
                    placeholder="E.g. Asus"
                    {...register("name", {
                      required: "Brand name is required",
                      maxLength: {
                        value: 50,
                        message: "Brand name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
                </div>

                {/* Existing Logo Preview */}
                <div className="mb-3">
                  <label className="form-label">Current Logo</label>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Brand Preview"
                      className="rounded img-thumbnail w-50 mb-3"
                    />
                  )}
                </div>

                {/* Update Logo */}
                <div className="mb-3">
                  <label htmlFor="updateBrandImageFile" className="form-label">
                    Brand Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="updateBrandImageFile"
                    accept="image/*"
                    onChange={handleUpdateImageChange}
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

export default UpdateBrands;
