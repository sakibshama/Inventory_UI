import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills, deleteBill } from "../../Slicer/BillSlicer";
import CreateBrand from "./CreateBill";


const Bill = () => {
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bill.bills);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  const handleDeleteBill = (id) => {
    dispatch(deleteBill(id));
  };

  const columnNames = [
    { id: 1, val: "BILL ID"},
    { id: 3, val: "CUSTOMER"},
    { id: 4, val: "TOTAL" },
    { id: 5, val: "PAID" },
    { id: 6, val: "DUE" },
    { id: 7, val: "DISCOUNT" },
    { id: 8, val: "Action" },
  ];

  return (
    <div>
      <h3>Bill</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateBrand />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Bill List</h5>
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
                {Array.isArray(bill) &&
                  bill.map((val) => (
                    <tr key={val.id}>
                      <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">{val.customer.name}</td>
                      <td className="text-nowrap">{val.total_amount}</td>
                      <td className="text-nowrap">{val.paid_amount}</td>
                      <td className="text-nowrap">{val.due_amount}</td>
                      <td className="text-nowrap">{val.discount}</td>

                      <td className="text-nowrap d-flex align-items-center gap-2">
                      
                        <button
                          onClick={() => handleDeleteBill(val.id)}
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

export default Bill;
