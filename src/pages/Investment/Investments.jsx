import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvestment, fetchInvestments, setStatus,investmentIdz } from "../../Slicer/InvestmentSlicer";
import CreateInvestment from "./CreateInvestment";
import UpdateInvestment from "./UpdateInvestment";
function Investments() {
    const dispatch = useDispatch();
    const investments = useSelector((state) => state.investments.investments);
    const isChanged = useSelector((state) => state.investments.isChanged);
    const status = useSelector((state) => state.investments.status);

    useEffect(() => {
        dispatch(fetchInvestments());
        // dispatch(setStatus(false));

    }, [dispatch, status, isChanged]);

    const handleDeleteInvestment = (id) => {
        dispatch(deleteInvestment(id));
    };

    const columnNames = [
        { id: 1, val: "Investment ID" },
        { id: 2, val: "Investor Name" },
        { id: 3, val: "Payment Type" },
        { id: 4, val: "Amount" },
        { id: 5, val: "Image" },
        { id: 6, val: "Status" },
        { id: 7, val: "Action" }
    ];

    const handleInfo = (id)=>{
        dispatch(investmentIdz(id));
    }

    return (
        <div>
            <h3>Investment</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateInvestment />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Investment List</h5>
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
                                {Array.isArray(investments) && investments.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.investor_name}</td>
                                        <td className="text-nowrap">{val.payment_type.type}</td>
                                        <td className="text-nowrap">{val.amount}</td>
                                        
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

                                        <td className="text-nowrap">{val.status}</td>

                                        <td className="text-nowrap d-flex align-items-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateBrandModal"
                                                onClick={() => handleInfo(val.id)}
                                            >
                                                <i className="bx bxs-edit"></i>
                                            </button>
                                            <UpdateInvestment />
                                            <button
                                                onClick={() => handleDeleteInvestment(val.id)}
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

export default Investments