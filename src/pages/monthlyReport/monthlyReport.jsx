import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMonthlyReport, fetchMonthlyReports, setMonthlyReportId } from "../../Slicer/MonthlyReportSlicer";
import { } from "../../Slicer/BillSlicer";
function Culstomers() {
    const dispatch = useDispatch();
    const monthlyReports = useSelector((state) => state.monthlyReports);
    const stock = useSelector((state) => state.stocks);
    const sells = useSelector((state) => state.sells)
    const bill = useSelector((state) => state.bill)

    useEffect(() => {
        dispatch(fetchMonthlyReports());
    }, [dispatch]);

    const handleDeleteMonthlyReport = (id) => {
        dispatch(deleteMonthlyReport(id));
    };

    const columnNames = [
        { id: 1, val: "Monthly Report ID" },
        { id: 2, val: "Quantity" },

        { id: 3, val: "Company Due" },
        { id: 4, val: "Customer Due" },
        { id: 5, val: "Sells" },
        //TODO:: create backend of profit
        { id: 6, val: "Profit" },
        { id: 7, val: "Status" },
    ];

    const handleInfo = (id) => {
        dispatch(setMonthlyReportId(id))
    }

    return (
        <div>
            <h3>MonthlyReport</h3>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Monthly Report List</h5>
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
                                {Array.isArray(monthlyReports) && monthlyReports.map((val) => {
                                    const supplierStock = stock.find((item) => item.stockId === val.id);
                                    const sell = sells.find((item) => item.sellId === val.id);
                                    const customerDue = bill.find((item) => item.setBillId === val.id);
                                    return (
                                        <tr key={val.id}>
                                            <td className="text-nowrap">{val.id}</td>
                                            <td className="text-nowrap">
                                                {supplierStock ? supplierStock.company_due : 'No company due'}
                                            </td>
                                            <td className="text-nowrap">
                                                {supplierStock ? supplierStock.quantity : 'No quantity'}
                                            </td>

                                            <td className="text-nowrap">
                                                {customerDue ? customerDue.customer_due : 'No customer due'}
                                            </td>
                                            <td className="text-nowrap">
                                                {sell ? sell.quantity : 'No company due'}
                                            </td>

                                            {/* <td className="text-nowrap">{val.company_due}</td>
                                        <td className="text-nowrap">{val.customer_due}</td> 
                                        <td className="text-nowrap">{val.sells}</td> */}
                                            <td className="text-nowrap">{val.profit}</td>



                                            <td className="text-nowrap d-flex align-items-center gap-2">

                                                <button
                                                    onClick={() => handleDeleteMonthlyReport(val.id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    <i className="bx bxs-trash"></i>
                                                </button>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Culstomers