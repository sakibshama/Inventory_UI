import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStock, fetchStocks } from "../../Slicer/StockSlicer";
import CreateStock from "./CreateStock";
import UpdateStock from "./UpdateStock";

function Stocks() {
    const dispatch = useDispatch();
    const  stocks  = useSelector((state) => state.stocks.stocks);
    const  isChanged  = useSelector((state) => state.stocks.isChanged);

    useEffect(() => {
        dispatch(fetchStocks());
        console.log(stocks);
        
    }, [dispatch, isChanged]);

    const handleDeleteStock = (id) => {
        dispatch(deleteStock(id));
    };

    const columnNames = [
        { id: 1, val: "ID" },
        { id: 2, val: "Stock Date" },
        { id: 3, val: "Product Name" },
        { id: 4, val: "Quantity" },
        { id: 5, val: "Buy Price" },
        { id: 6, val: "Sell Price" },
        { id: 7, val: "Total Amount" },
        { id: 8, val: "Paid Amount" },
        { id: 9, val: "Dues" },
        { id: 10, val: "Action" }
    ];

    return (
        <div>
            <h3>Stock History</h3>

            {/* <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateStock />
                </div>
            </div> */}

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Stock History List</h5>
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
                                {Array.isArray(stocks) && stocks.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.stock_date}</td>
                                        <td className="text-nowrap">{val.product.name}</td>
                                        <td className="text-nowrap">{val.quantity}</td>
                                        <td className="text-nowrap">{val.buy_price}</td>
                                        <td className="text-nowrap">{val.sell_price}</td>
                                        <td className="text-nowrap">{val.total}</td>
                                        
                                        <td className="text-nowrap">{val.paid_amount}</td>
                                        <td className="text-nowrap">{val.dues}</td>

                                        <td className="text-nowrap d-flex align-items-center gap-2">
                                            {/* <UpdateStock stockId={val.id} /> */}
                                            <button
                                                onClick={() => handleDeleteStock(val.id)}
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

export default Stocks