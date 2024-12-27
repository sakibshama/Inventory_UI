import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchContainerById, updateContainer } from "../../Slicer/ContainerSlicer";

const UpdateContainer = () => {
  const dispatch = useDispatch();
  const setContainerId = useSelector((state) => state.containers.setContainerId);
  
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

  // Fetch Container data and set form values
  useEffect(() => {
    if (setContainerId) {
      dispatch(fetchContainerById(setContainerId)).then((res) => {
        const { shipment_id, amount, lc_copy } = res.payload;
        setValue("shipment_id", shipment_id);
        setValue("amount", amount);
        setValue("lc_copy", lc_copy);
        setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${lc_copy}`);
        // setPreviewImage(`http://lb.app.mystrix.site/uploads/${image}`);
        
      });
    }
  }, [dispatch, setContainerId, setValue]);

  // Handle file change for the Container image
  const handleUpdateImageChange = (e) => {
    setIsImageChanged(true);
    const file = e.target.files[0];
    setValue("lc_copy", file); // Update file in form
    setPreviewImage(URL.createObjectURL(file)); // Update preview
  };

  // Form submit handler
  const onSubmit = async (data) => {
console.log(data);

    const formData = new FormData();

    formData.append("shipment_id", data.shipment_id);
    formData.append("amount", data.amount);

    if (isImageChanged) {
      formData.append("lc_copy", data.lc_copy);
     
    }

    try {

      const jsonDataWithFile = await formDataToJsonWithFile(formData);
      
      console.log(setContainerId);
      

      const res = dispatch(updateContainer({ id: setContainerId, updatedData: jsonDataWithFile }));
       res.then((val) => {
         console.log(val.payload);
        

       })
     
    
      // alert("Container updated successfully!");
    } catch (error) {
      console.error("Error updating Container:", error);
    }

  };


  return (
    <div>

      <div
        className="modal fade"
        id="updateContainerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateContainerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateContainerLabel">
                Update Container
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
                {/* Container Title */
                
                }
                <div className="mb-3">
                  <label htmlFor="ContainerNameUpdate" className="form-label">
                    Shipment ID
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.shipment_id ? "is-invalid" : ""}`}
                    id="name"
                    placeholder="E.g. Electronics"
                    {...register("shipment_id", {
                      required: "Shipment ID is required",
                      maxLength: {
                        value: 50,
                        message: "Shipment ID cannot exceed 50 characters",
                      },
                    })}
                  />
                  {errors.shipment_id && (
                    <p className="invalid-feedback">{errors.shipment_id.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="ContainerNameUpdate" className="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.amount? "is-invalid" : ""}`}
                    id="name"
                    placeholder="E.g. 500"
                    {...register("amount", {
                      required: "Amount is required",
                     
                    })}
                  />
                  {errors.shipment_id && (
                    <p className="invalid-feedback">{errors.amount.message}</p>
                  )}
                </div>

                {/* Existing Image Preview */}
                <div className="mb-3">
                  <label className="form-label">Current Image</label>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Container Preview"
                      className="rounded img-thumbnail w-50 mb-3"
                    />
                  )}
                </div>

                {/* Update Image */}
                <div className="mb-3">
                  <label htmlFor="updateContainerImageFile" className="form-label">
                    Container Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="updateContainerImageFile"
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

export default UpdateContainer;
