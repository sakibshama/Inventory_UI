import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenses, fetchExpenses, expenseIdz } from "../../Slicer/ExpenseSlicer";
import CreateExpense from "./CreateExpense";
import UpdateExpense from "./UpdateExpense";

function Expense() {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);
    const isChanged = useSelector((state) => state.expenses.isChanged);

    useEffect(() => {
        dispatch(fetchExpenses());
        // setChangeStatus(!isChanged);
    }, [dispatch, isChanged]);


    const handleInfo = (id)=>{
        dispatch(expenseIdz(id));
    }

    const handleDeleteExpense = (id) => {
        dispatch(deleteExpenses(id));
    };

    const columnNames = [
        { id: 1, val: "ID" },
        { id: 2, val: "Desciription" },
        { id: 3, val: "Expensor Name" },
        { id: 4, val: "Expense Type" },
        { id: 5, val: "Payment Type" },
        { id: 6, val: "Amount" },
        { id: 7, val: "Action" }
    ];

    return (
        <div>
            <h3>Expense</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateExpense />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Expense List</h5>
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
                                {Array.isArray(expenses) && expenses.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.description}</td>
                                        <td className="text-nowrap">{val.expenser_name}</td>
                                        <td className="text-nowrap">{val.expense_category.type}</td>
                                        <td className="text-nowrap">{val.payment_type.type}</td>
                                        <td className="text-nowrap">{val.amount}</td>



                                        <td className="text-nowrap d-flex align-items-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateBrandModal"
                                                onClick={()=>{handleInfo(val.id)}}
                                            >
                                                Update
                                            </button>
                                            <UpdateExpense />
                                            <button
                                                onClick={() => handleDeleteExpense(val.id)}
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

export default Expense