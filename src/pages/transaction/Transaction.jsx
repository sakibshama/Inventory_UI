import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction, deleteTransaction } from "../../Slicer/TransactionSlicer";
import CreateTransection from "./CreateTransection";

const Transaction = () => {
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.transaction.transaction);
  const isChanged = useSelector((state) => state.transaction.isChanged);

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch,isChanged]);

  const handleDeleteTransection = (id) => {
    dispatch(deleteTransaction(id));
  };

  const columnNames = [
    { id: 1, val: "ID" },
    { id: 2, val: "TYPE" },
    { id: 3, val: "METHOD" },
    { id: 4, val: "DESCRIPTION" },
    { id: 5, val: "AMOUNT" },
    { id: 6, val: "BILL ID" },
    { id: 7, val: "EXPENSE ID" },
    { id: 8, val: "INVESTMENT ID" },
    { id: 9, val: "STOCK ID" },
    { id: 10, val: "Action" },
  ];

  return (
    <div>
      <h3>Transaction</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateTransection />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Transaction List</h5>
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
                {Array.isArray(transaction) &&
                  transaction.map((val) => (
                    <tr key={val.id}>
                      <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">{val.transaction_type}</td>
                      <td className="text-nowrap">{val.payment_type.type}</td>
                      <td className="text-nowrap">{val.comment}</td>
                      <td className="text-nowrap">{val.amount}</td>
                      <td className="text-nowrap">{val.bill_id}</td>
                      <td className="text-nowrap">{val.expense_id}</td>
                      <td className="text-nowrap">{val.investment_id}</td>
                      <td className="text-nowrap">{val.stock_id}</td>
                     
                      
                      <td className="text-nowrap d-flex align-items-center gap-2">
                        <button
                          onClick={() => handleDeleteTransection(val.id)}
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
};

export default Transaction;
