import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateRole, fetchRoleById } from "../../Slicer/RoleSlicer";

function UpdateRole() {
  const dispatch = useDispatch();
  const roleId = useSelector((state) => state.roles.roleId);




  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch sell data and set form values
  useEffect(() => {
    dispatch(fetchRoleById(roleId)).then((res) => {
      const { role_name, permissions } = res.payload;
      setValue("role_name", role_name); // Set form field value
      setValue("permissions", permissions); // Set form field value

    });
  }, [dispatch, roleId, setValue]);



  // Form submit handler
  const onSubmit = (data) => {


    dispatch(updateRole({ id: roleId, updatedData: data }));
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
                Update Sell
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
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Role Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Role name"
                    {...register("role_name", {
                      required: "Role Name is required",
                    })}
                  />
                  {errors.role_name && (
                    <p className="text-danger">{errors.role_name.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="brandNameUpdate" className="form-label">
                    Permissions
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerNameUpdate"
                    placeholder="Permissions"
                    {...register("permissions", {
                      required: "Permissions is required",
                    })}
                  />
                  {errors.permissions && (
                    <p className="text-danger">{errors.permissions.message}</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Update
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

export default UpdateRole