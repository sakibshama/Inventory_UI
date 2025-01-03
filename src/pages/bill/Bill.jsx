import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills, deleteBill, setBillIdz } from "../../Slicer/BillSlicer";
import CreateBrand from "./CreateBill";
import UpdateBill from "./UpdateBill";


const Bill = () => {
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bill.bills);
  const isChanged = useSelector((state) => state.bill.isChanged);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch, isChanged]);


  const handleInfo = (id)=>{
    dispatch(setBillIdz(id));
  }

  const handleDeleteBill = (id) => {
    dispatch(deleteBill(id));
  };

  const columnNames = [
    { id: 1, val: "BILL ID" },
    { id: 2, val: "SELL ID" },
    { id: 3, val: "CUSTOMER" },
    { id: 4, val: "TOTAL" },
    { id: 5, val: "PAID" },
    { id: 6, val: "DUE" },
    { id: 7, val: "DISCOUNT" },
    { id: 8, val: "USER" },
    { id: 9, val: "Action" },
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
                      <td className="text-nowrap">{val.sell_id}</td>
                      <td className="text-nowrap">{val.customer.name}</td>
                      <td className="text-nowrap">{val.total_amount}</td>
                      <td className="text-nowrap">{val.paid_amount}</td>
                      <td className="text-nowrap">{val.due_amount}</td>
                      <td className="text-nowrap">{val.discount}</td>
                      <td className="text-nowrap">{val.user.name}</td>

                      <td className="text-nowrap d-flex align-items-center gap-2">

                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#updateBillModal"
                          onClick={() => { handleInfo(val.id) }}
                        >
                          <i className="bx bxs-edit"></i>
                        </button>
                        <UpdateBill />

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
