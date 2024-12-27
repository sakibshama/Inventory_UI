import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUserById } from "../../Slicer/UserSlicer";

function UpdateUser() {
  const dispatch = useDispatch();
  const setUserIdz = useSelector((state) => state.users.setUserIdz);

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch user data and populate form
  useEffect(() => {
    if (setUserIdz) {
      dispatch(fetchUserById(setUserIdz)).then((res) => {
        const { role_id, name, email, gender, phone, c_percentage, c_amount, image, status } = res.payload || {};
        setValue("role_id", role_id || "");
        setValue("name", name || "");
        setValue("email", email || "");
        setValue("gender", gender || "");
        setValue("phone", phone || "");
        setValue("c_percentage", c_percentage || 0);
        setValue("c_amount", c_amount || 0);
        setValue("status", status || 1);

        if (image) {
          setPreviewImage(`${import.meta.env.VITE_BASE_URL}/storage/${image}`);
        }
      });
    }
  }, [dispatch, setUserIdz, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageChanged(true);
      setValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("role_id", data.role_id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("phone", data.phone);
    formData.append("c_percentage", data.c_percentage);
    formData.append("c_amount", data.c_amount);
    formData.append("status", data.status);

    if (isImageChanged) {
      formData.append("image", data.image);
    }

    try {

      const jsonDataWithFile = await formDataToJsonWithFile(formData);
      const response = dispatch(updateUser({ id: setUserIdz, updatedData: jsonDataWithFile }));

    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="updateUserModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="updateUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateUserLabel">
                Update User
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Role ID */}
                <div className="mb-3">
                  <label className="form-label">Role ID</label>
                  <input
                    type="number"
                    className={`form-control ${errors.role_id ? "is-invalid" : ""}`}
                    {...register("role_id", { required: "Role ID is required" })}
                  />
                  {errors.role_id && <p className="invalid-feedback">{errors.role_id.message}</p>}
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                    {...register("gender", { required: "Gender is required" })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <p className="invalid-feedback">{errors.gender.message}</p>}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    {...register("phone")}
                  />
                </div>

                {/* Commission Percentage */}
                <div className="mb-3">
                  <label className="form-label">Commission Percentage</label>
                  <input
                    type="number"
                    className={`form-control ${errors.c_percentage ? "is-invalid" : ""}`}
                    {...register("c_percentage")}
                  />
                </div>

                {/* Commission Amount */}
                <div className="mb-3">
                  <label className="form-label">Commission Amount</label>
                  <input
                    type="number"
                    className={`form-control ${errors.c_amount ? "is-invalid" : ""}`}
                    {...register("c_amount")}
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-control" {...register("status")}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  {previewImage && <img src={previewImage} alt="User" className="w-25 mb-3" />}
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Submit */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update User"}
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

export default UpdateUser;
