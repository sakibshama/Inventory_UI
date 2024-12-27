import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryById, updateCategory } from "../../Slicer/CategorySlicer";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const setCategoryId = useSelector((state) => state.category.setCategoryId);
  
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);



  //sss

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // base64 encoded file
      reader.onerror = reject;
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  }
  
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
  


  //ssss

  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch category data and set form values
  useEffect(() => {
    if (setCategoryId) {
      dispatch(fetchCategoryById(setCategoryId)).then((res) => {
        const { name, image } = res.payload;
        setValue("name", name);
        setValue("image", image);
        setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${image}`);
        // setPreviewImage(`http://lb.app.mystrix.site/uploads/${image}`);
        
      });
    }
  }, [dispatch, setCategoryId, setValue]);

  // Handle file change for the category image
  const handleUpdateImageChange = (e) => {
    setIsImageChanged(true);
    const file = e.target.files[0];
    setValue("image", file); // Update file in form
    setPreviewImage(URL.createObjectURL(file)); // Update preview
  };

  // Form submit handler
  const onSubmit = async (data) => {
console.log(data);

    const formData = new FormData();

    formData.append("name", data.name);

    if (isImageChanged) {
      formData.append("image", data.image);
     
    }

    try {

      const jsonDataWithFile = await formDataToJsonWithFile(formData);
 

      const res = dispatch(updateCategory({ id: setCategoryId, updatedData: jsonDataWithFile }));
       res.then((val) => {
         console.log(val.payload);
        

       })
     
    
      // alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
    }

  };


  return (
    <div>

      <div
        className="modal fade"
        id="updateCategoryModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateCategoryLabel">
                Update Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data" method="PUT">
                {/* Category Title */
                
                }
                <div className="mb-3">
                  <label htmlFor="categoryNameUpdate" className="form-label">
                    Category Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    placeholder="E.g. Electronics"
                    {...register("name", {
                      required: "Category name is required",
                      maxLength: {
                        value: 50,
                        message: "Category name cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
                </div>

                {/* Existing Image Preview */}
                <div className="mb-3">
                  <label className="form-label">Current Image</label>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Category Preview"
                      className="rounded img-thumbnail w-50 mb-3"
                    />
                  )}
                </div>

                {/* Update Image */}
                <div className="mb-3">
                  <label htmlFor="updateCategoryImageFile" className="form-label">
                    Category Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="updateCategoryImageFile"
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

export default UpdateCategory;
