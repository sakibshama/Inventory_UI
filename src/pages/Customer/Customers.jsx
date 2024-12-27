import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, fetchCustomers, setCustomerId } from "../../Slicer/CustomerSlicer";
import CreateCustomer from "./CreateCustomer";
import UpdateCustomer from "./UpdateCustomer";
function Culstomers() {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customers.customers);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleDeleteCustomer = (id) => {
        dispatch(deleteCustomer(id));
    };

    const columnNames = [
        { id: 1, val: "Customer ID" },
        { id: 2, val: "Customer Name" },
        { id: 3, val: "Contact" },
        { id: 4, val: "Address" },,
        { id: 5, val: "Image" },
        { id: 6, val: "Status" },
    ];

    const handleInfo = (id) => {
        dispatch(setCustomerId(id))
    }

    return (
        <div>
            <h3>Customer</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateCustomer />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Customer List</h5>
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
                                {Array.isArray(customers) && customers.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.name}</td>
                                        <td className="text-nowrap">{val.contact}</td>
                                        <td className="text-nowrap">{val.address}</td>
                                        {/* <td className="text-nowrap">{val.installment_date}</td> */}

                                        <td className="text-nowrap">
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar avatar-xs pull-up"
                                                >
                                                    <img
                                                        src={`${import.meta.env.VITE_BASE_URL}/storage/${val.image}`}
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
                                                 data-bs-target="#updateCustomerModal"
                                                 
                                                onClick={() => handleInfo(val.id)}
                                            >
                                                Update
                                            </button>
                                            <UpdateCustomer/>

                                            <button
                                                onClick={() => handleDeleteCustomer(val.id)}
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
}

export default Culstomers