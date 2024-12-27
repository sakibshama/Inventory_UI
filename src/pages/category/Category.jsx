import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, deleteCategory, setCategoryId } from "./../../Slicer/CategorySlicer";
import CreateCategorys from "./CreateCategory";
import UpdateCategorys from "./UpdateCategory";

const Categorys = () => {
  
  const IMG_BASE_URL = `${import.meta.env.VITE_BASE_URL}/storage`;
  // const IMG_BASE_URL = `http://lb.app.mystrix.site/uploads`;
  const dispatch = useDispatch();
  const Categorys = useSelector((state) => state.category.Category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleInfo = (id)=>{
    console.log(id);
    dispatch(setCategoryId(id));
  }
  
  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const columnNames = [
    { id: 1, val: "Category ID" },
    { id: 2, val: "Category Name" },
    { id: 3, val: "Image" },
    { id: 4, val: "Action" },
  ];


  return (
    <div>
      <h3>Categorys</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateCategorys />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Category List</h5>
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr className="text-nowrap">
                  {columnNames.map((value) => (
                    <th key={value.id} className="text-nowrap">
                      {value.val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {Array.isArray(Categorys) &&
                  Categorys.map((val) => (
                    <tr key={val.id}>
                      <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">{val.name}</td>
                      <td className="text-nowrap">
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            className="avatar avatar-xs pull-up"
                          >
                            <img
                              src={`${IMG_BASE_URL}/${val.image}`}
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </li>
                        </ul>
                      </td>
                      <td className="text-nowrap d-flex align-items-center gap-2">

                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#updateCategoryModal"
                          onClick={() => { handleInfo(val.id) }}
                        >
                          Update
                        </button>
                        <UpdateCategorys  />


                        <button
                          onClick={() => handleDeleteCategory(val.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="bx bxs-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorys;
