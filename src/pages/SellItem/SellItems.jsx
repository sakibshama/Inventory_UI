import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSellItem, fetchSellItems, sellItemIdz } from "../../Slicer/SellItemSlicer";
import CreateSellItem from "./CreateSellItem";
import UpdateSellItem from "./UpdateSellItem";


function SellItems() {
    const dispatch = useDispatch();
    const { sellItems } = useSelector((state) => state.sellItems);
    const isChanged = useSelector((state) => state.sellItems.isChanged);

    useEffect(() => {
        dispatch(fetchSellItems());
    }, [dispatch, isChanged]);

    const handleDeleteSellItem = (id) => {
        dispatch(deleteSellItem(id));
    };


    const handleInfo = (id)=>{
        dispatch( sellItemIdz(id));
        
       
    }

    const columnNames = [
        { id: 1, val: "Sell Item ID" },
        { id: 2, val: "Sell ID" },
        { id: 3, val: "Product" },
        { id: 4, val: "Container" },
        { id: 5, val: "Stock ID" },
        { id: 6, val: "Quantity" },
        { id: 7, val: "Unit Price" },
        { id: 8, val: "Total Price" },
        { id: 9, val: "Profit" },
        { id: 10, val: "Comission" },
        { id: 11, val: "Status" },
        { id: 12, val: "Action" }
    ];

    return (
        <div>
            <h3>Sell Item</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateSellItem />
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
                                {Array.isArray(sellItems) && sellItems.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.sell_id}</td>

                                        <td className="text-nowrap">{val.product.name}</td>
                                        <td className="text-nowrap">{val.container_id}</td>
                                        <td className="text-nowrap">{val.stock_id}</td>
                                        <td className="text-nowrap">{val.quantity}</td>
                                        <td className="text-nowrap">{val.price}</td>
                                        <td className="text-nowrap">{val.total_price}</td>
                                        <td className="text-nowrap">{val.profit}</td>
                                        <td className="text-nowrap">{val.comission}</td>
                                        <td className="text-nowrap">{val.status}</td>


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
                                            <UpdateSellItem />
                                            <button
                                                onClick={() => handleDeleteSellItem(val.id)}
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

export default SellItems