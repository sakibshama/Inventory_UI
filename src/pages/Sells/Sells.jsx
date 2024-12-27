import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSell, fetchSell, sellIdz } from "../../Slicer/SellsSlicer";
import CreateSell from "./CreateSell";
import UpdateSell from "./UpdateSell";
function Sells() {

    const dispatch = useDispatch();
    const { sells } = useSelector((state) => state.sells);
    const isChanged = useSelector((state) => state.sells.isChanged);

    useEffect(() => {
        dispatch(fetchSell());
    }, [dispatch, isChanged]);

    const handleDeleteSell = (id) => {
        dispatch(deleteSell(id));
    };

    const handleInfo = (id)=>{
        dispatch(sellIdz(id));
    }

    const columnNames = [
        { id: 1, val: "Sell ID" },
        { id: 1, val: "Customer Name" },
        { id: 2, val: "Total Amount" },
        { id: 3, val: "Status" }
    ];

    return (
        <div>
            <h3>Sells</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateSell />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Sell List</h5>
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
                                {Array.isArray(sells) && sells.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.customer.name}</td>
                                        <td className="text-nowrap">{val.total_amount}</td>

                                        <td className="text-nowrap d-flex align-items-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateBrandModal"
                                                onClick={()=>{handleInfo(val.id)}}
                                            >
                                                <i className="bx bxs-edit"></i>
                                            </button>
                                            <UpdateSell />
                                            <button
                                                onClick={() => handleDeleteSell(val.id)}
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

export default Sells