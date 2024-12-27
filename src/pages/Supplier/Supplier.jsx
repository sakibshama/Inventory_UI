import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers, deleteSupplier, setSupplierIdz } from "../../Slicer/SupplierSlicer";
import CreateSupplier from "./CreateSupplier";
import UpdateSupplier from "./UpdateSupplier";

const Supplier = () => {
  
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.supplier.suppliers);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleDeleteSupplier = (id) => {
    dispatch(deleteSupplier(id));
  };

  const handleInfo = (id) => {
    dispatch(setSupplierIdz(id))
  }

  const columnNames = [
    { id: 1, val: "SUPPLIER ID" },
    { id: 2, val: "SUPPLIER NAME" },
    { id: 3, val: "SUPPLIER CONTACT" },
    { id: 4, val: "SUPPLIER ADDRESS" },
    { id: 5, val: "SUPPLIER IMAGE" },
    { id: 6, val: "Action" },
  ];

  return (
    <div>
      <h3>Supplier</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateSupplier />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Supplier List</h5>
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
                {Array.isArray(suppliers) &&
                  suppliers.map((val) => {
                    // Find stock for the current supplier


                    return (
                      <tr key={val.id}>
                        <td className="text-nowrap">{val.id}</td>
                        <td className="text-nowrap">{val.name}</td>
                        <td className="text-nowrap">{val.contact}</td>
                        <td className="text-nowrap">{val.address}</td>
                        {/* <td className="text-nowrap">{val.company_due}</td> */}

                        <td className="text-nowrap">
                          <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                            >
                              <img
                                src={`${import.meta.env.VITE_BASE_URL
                                  }/storage/${val.image}`}
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
                            data-bs-target="#updateSupplierModal"
                            onClick={() => { handleInfo(val.id) }}
                          >
                            Update
                          </button>
                          <UpdateSupplier />
                          <button
                            onClick={() => handleDeleteSupplier(val.id)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="bx bxs-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
