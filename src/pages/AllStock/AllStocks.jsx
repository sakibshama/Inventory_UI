import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllStock, fetchAllStocks } from "../../Slicer/AllStockSlicer";
import CreateAllStock from "./CreateAllStock";
import UpdateAllStock from "./UpdateAllStock";
import StockCreationSuccess from "./StockCreationSuccess";
import Loader from "./Loader";
import AdvancedLoader from "./AdvanceLoader";



function AllStocks() {
    const dispatch = useDispatch();
    const [showSuccess, setShowSuccess] = useState(false);
    const  allstocks  = useSelector((state) => state.allstocks.allstocks);
    const  isChanged  = useSelector((state) => state.allstocks.isChanged);
    const  isLoading  = useSelector((state) => state.allstocks.loading);
    const  isLoading2  = useSelector((state) => state.stocks.loading);




     const handleStockCreation = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000); // Hide after 3 seconds
    };

    useEffect(() => {
        dispatch(fetchAllStocks());

        console.log(allstocks);
        if(isChanged){
            handleStockCreation();
        }
        
    }, [dispatch, isChanged]);


   

    const handleDeleteStock = (id) => {
        dispatch(deleteAllStock(id));
    };

    const columnNames = [
        { id: 1, val: "ID" },
        { id: 2, val: "Stock Date" },
        { id: 3, val: "Container ID" },
        { id: 4, val: "Product Name" },
        { id: 5, val: "Quantity" },
        { id: 6, val: "Buying Price" },
        { id: 7, val: "Selling Price" },
        { id: 8, val: "Total Amount" },
        { id: 9, val: "Paid Amount" },
        { id: 10, val: "Dues" },
        { id: 11, val: "Action" }
    ];

    return (
        <div>
            <h3>All Stocks</h3>

            {(isLoading || isLoading2) && <Loader />}
            {/* {(isLoading || isLoading2) && <Loader />} */}

            {showSuccess && <StockCreationSuccess />}

            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateAllStock />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">All Stock List</h5>
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
                                {Array.isArray(allstocks) && allstocks.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.stock_date}</td>
                                        <td className="text-nowrap">{val.container.shipment_id}</td>
                                        <td className="text-nowrap">{val.product.name}</td>
                                        <td className="text-nowrap">{val.quantity}</td>
                                        <td className="text-nowrap">{val.buy_price}</td>
                                        <td className="text-nowrap">{val.sell_price}</td>
                                       
                                        <td className="text-nowrap fw-bold">{val.total}</td>
                                        <td className="text-nowrap">{val.paid_amount}</td>
                                        <td className="text-nowrap">{val.dues}</td>
                                  


                                   



                                        <td className="text-nowrap d-flex align-items-center gap-2">
                                            {/* <UpdateAllStock stockId={val.id} /> */}
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

export default AllStocks