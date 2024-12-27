import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayment, deletePayment, setPaymentIdz } from "../../Slicer/paymentTypeSlicer";
import CreatePaymentType from "./createPaymentType";
import UpdatePaymentTypes from "./UpdatePaymentTypes";

const PaymentType = () => {
  const dispatch = useDispatch();
  const paymentType = useSelector((state) => state.paymentType.paymentType);

  useEffect(() => {
    dispatch(fetchPayment());
    console.log(paymentType);

  }, [dispatch]);

  const handleDeleteBrand = (id) => {
    dispatch(deletePayment(id));
  };

  const handleInfo = (id)=>{
    dispatch(setPaymentIdz(id));
  }

  const columnNames = [
    { id: 1, val: "PAYMENT ID" },
    { id: 2, val: "PAYMENT Name" },
    { id: 3, val: "ACCOUNT NO " },
    { id: 4, val: "LOGO " },
    { id: 5, val: "Action" },
  ];

  return (
    <div>
      <h3>PaymentType</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreatePaymentType />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">PaymentType List</h5>
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
                {Array.isArray(paymentType) &&
                  paymentType.map((val) => (
                    <tr key={val.id}>
                      <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">
                        {val.type}
                      </td>
                      <td className="text-nowrap">
                        {val.account_no}
                      </td>
                      <td className="text-nowrap">
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            className="avatar avatar-xs pull-up"
                          >
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/storage/${val.logo}`}
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </li>
                        </ul>
                      </td>

                      <td className="text-nowrap d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#updatePaymentTypeModal"
                          onClick={()=>{handleInfo(val.id)}}
                        >
                          Edit
                        </button>
                        <UpdatePaymentTypes/>


                        <button
                          onClick={() => handleDeleteBrand(val.id)}
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

export default PaymentType;
