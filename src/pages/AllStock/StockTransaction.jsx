import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {fetchPayment} from './../../Slicer/paymentTypeSlicer';
import {createTransaction} from './../../Slicer/TransactionSlicer';



const StockTransaction = () => {

    const dispatch = useDispatch();
    const [payments, setPayments] = useState([{ payment_type_id: "", amount: null }]);
    const [totalAmount, setTotalAmount] = useState(0);

    const paymentType = useSelector((state) => state.paymentType.paymentType);
    const getStockId = useSelector((state) => state.transaction.getStockId);
    const stock_id = useSelector((state) => state.allstocks.stock_id);


    useEffect(() => {

      dispatch(fetchPayment());

    }, []);
  

    const handleAddPayment = () => {
        setPayments([...payments, { payment_type_id: "", amount: null }]);
    };

    const handleRemovePayment = (index) => {
        const updatedPayments = payments.filter((_, i) => i !== index);
        setPayments(updatedPayments);
    };

    const handlePaymentChange = (index, field, value) => {
        const updatedPayments = [...payments];
        updatedPayments[index][field] = field === "amount" ? parseFloat(value) || 0 : value;
        setPayments(updatedPayments);

        // Update the total amount
        const updatedTotal = updatedPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
        setTotalAmount(updatedTotal);
    };

    const handleSubmit = () => {


        // const totalPayment = payments.reduce((sum, payment) => sum + payment.amount, 0);

        // if (totalPayment <= 0) {
        //     alert("The total payment must be greater than zero.");
        //     return;
        // }


 

        payments.forEach((payment) => {
            let transactionData = {...payment,stock_id:stock_id, transaction_type:"out"};

            dispatch(createTransaction(transactionData));
          });
        
        


    };

    useEffect(()=>{
        if(stock_id > 0){
            handleSubmit();
        }
    },[stock_id]);



    return (
        <form>


            <div id="paymentMethodsContainer">
                {payments.map((payment, index) => (
                    <div className="row" key={index} style={{ marginBottom: "10px" }}>

                        <div className="mb-3 col-md-5">
                            <select
                                className="form-select"
                                value={payment.method}
                                onChange={(e) => handlePaymentChange(index,"payment_type_id", e.target.value)}
                                required
                            >
                                <option value="">-- Select Payment Method --</option>
                                {paymentType.map((val,index)=>{
                                    return <option key={index} value={val.id}>{val.type}</option>
                                })}

                            </select>
                        </div>

                        <div className="mb-3 col-md-5">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Amount"
                                value={payment.amount}
                                onChange={(e) => handlePaymentChange(index, "amount", e.target.value)}
                                required
                            />

                        </div>


                        {payments.length > 1 && (
                            <div className="mb-3 col-md-2">
                                <button className="btn btn-sm btn-danger" type="button" onClick={() => handleRemovePayment(index)}>
                                    Remove
                                </button>
                            </div>

                        )}
                    </div>
                ))}
            </div>

            <button className="btn btn-sm btn-dark" type="button" onClick={handleAddPayment}>
                Add Payment Method
            </button>

            {/* Total Amount */}
            <p className="my-3">Total Payment: ${totalAmount.toFixed(2)}</p>

            {/* <button type="button" onClick={handleSubmit} className="btn btn-dark btn-sm">Submit</button> */}
        </form>
    );
};

export default StockTransaction;
