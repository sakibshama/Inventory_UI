import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvestment } from "../../Slicer/InvestmentSlicer"; // Assuming you have an investment slice in your Redux store
import {fetchPayment} from './../../Slicer/paymentTypeSlicer';

function CreateInvestment() {

    const dispatch = useDispatch();
    const paymentType = useSelector((state)=>state.paymentType.paymentType);

    useEffect(()=>{
      dispatch(fetchPayment());
    },[]);

    const dismissModal = useRef();
    const [investmentData, setInvestmentData] = useState({
        investor_name: "",
        payment_id: "",
        amount: "",
        image: null,
        deed_image: null,
        // status: true,
    });

    const handleImage = (e) => {
        const file = e.target.files[0];
        setInvestmentData({ ...investmentData, image: file });
    };

    const handleDeedImage = (e) => {
        const file = e.target.files[0];
        setInvestmentData({ ...investmentData, deed_image: file });
    };

    const handleCreateInvestment = () => {
        dispatch(createInvestment(investmentData))
            .then((res) => {
                // Close the modal after investment is created
                dismissModal.current.click();
            })
            .catch((err) => {
                console.error("Error creating investment:", err);
            });
    };

    return (
        <div >
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#createInvestmentModal"
            >
                Add Investment
            </button>

            <div
                className="modal fade"
                id="createInvestmentModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="createInvestmentLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createInvestmentLabel">
                                Add a New Investment
                            </h5>
                            <button
                                type="submit"
                                ref={dismissModal}
                                data-bs-dismiss="modal"
                                className="btn btn-danger"
                                hidden
                            >
                                x
                            </button>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="investorNameInput" className="form-label">
                                    Investor Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="investorNameInput"
                                    placeholder="Investor Name"
                                    value={investmentData.investor_name}
                                    onChange={(e) => {
                                        setInvestmentData({ ...investmentData, investor_name: e.target.value });
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="paymentTypeInput" className="form-label">
                                    Payment Type
                                </label>
                                <select
                                    type="text"
                                    className="form-control"
                                    id="paymentTypeInput"
                                    placeholder="Payment Type ID"
                                    
                                    onChange={(e) => {
                                        setInvestmentData({ ...investmentData, payment_id: e.target.value });
                                    }}
                                >
                                  <option value="">Select Payment Type</option>
                                  {paymentType.map((val,i)=>{
                                    return(
                                      <option key={i} value={val.id}>{val.type}</option>
                                      )
                                  })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="amountInput" className="form-label">
                                    Investment Amount
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amountInput"
                                    placeholder="Investment Amount"
                                    value={investmentData.amount}
                                    onChange={(e) => {
                                        setInvestmentData({ ...investmentData, amount: e.target.value });
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="imageFile" className="form-label">
                                    Investment Image
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="imageFile"
                                    onChange={handleImage}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="deedImageFile" className="form-label">
                                    Deed Image
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="deedImageFile"
                                    onChange={handleDeedImage}
                                />
                            </div>

                            {/* <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="statusCheck"
                                    checked={investmentData.status}
                                    onChange={(e) => {
                                        setInvestmentData({ ...investmentData, status: e.target.checked });
                                    }}
                                />
                                <label className="form-check-label" htmlFor="statusCheck">
                                    Active
                                </label>
                            </div> */}
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={handleCreateInvestment}
                                type="button"
                                className="btn btn-primary"
                            >
                                Add Investment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateInvestment;
