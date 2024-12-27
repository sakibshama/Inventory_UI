import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseCategorys, fetchExpenseCategorys, expenseCategoryIdz } from "../../Slicer/ExpenseCategorySlicer";
import CreateExpenseCategory from "./CreateExpenseCategory";
import UpdateExpenseCategory from "./UpdateExpenseCategory";

function ExpenseCategorys() {
    const dispatch = useDispatch();
    const expenseCategorys = useSelector((state) => state.expenseCategorys.expenseCategorys);

    useEffect(() => {
        dispatch(fetchExpenseCategorys());
    }, [dispatch]);

    const handleInfo = (id)=>{
        dispatch(expenseCategoryIdz(id));
    }

    const handleDeleteExpenseCategory = (id) => {
        dispatch(deleteExpenseCategorys(id));
    };

    const columnNames = [
        { id: 1, val: "ID" },
        { id: 2, val: "Name" },
        { id: 3, val: "Type" },
        { id: 4, val: "Status" }
    ];

    return (
        <div>
            <h3>Expense Categorys</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateExpenseCategory />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">Expense Category List</h5>
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
                                {Array.isArray(expenseCategorys) && expenseCategorys.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.name}</td>
                                        <td className="text-nowrap">{val.type}</td>

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
                                            <UpdateExpenseCategory expenseCategoryId={val.id} />
                                            <button
                                                onClick={() => handleDeleteExpenseCategory(val.id)}
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

export default ExpenseCategorys