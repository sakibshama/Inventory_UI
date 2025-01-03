import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from '../../Slicer/CustomerSlicer';
import { setCustomerId } from './../../Slicer/GenerateBillSlicer';
import BillItems from "./BillItems";

const GenerateBill = () => {
    const dispatch = useDispatch();
    const newCustomerForm = useRef();
    const existingCustomerForm = useRef();

    const bill = useSelector((state) => state.bill.bills);
    const customers = useSelector((state) => state.customers.customers);

    // Customer Form Customization
    const [customerType, setCustomerType] = useState();
    useEffect(() => {
        if (customerType == 2) {
            newCustomerForm.current.style.display = "none";
            existingCustomerForm.current.style.display = "block";
        } else if (customerType == 1) {
            existingCustomerForm.current.style.display = "none";
            newCustomerForm.current.style.display = "block";
        } else {
            existingCustomerForm.current.style.display = "none";
            newCustomerForm.current.style.display = "none";
        }
    }, [customerType]);

    const [customerData, setCustomerData] = useState({
        name: "",
        contact: "",
        address: ""
    });

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleCustomerChange = (e) => {
        const customerId = e.target.value;
        dispatch(setCustomerId(customerId));
        console.log("Selected Customer ID:", customerId);
    };

    return (
        <div>
            <h3>Bill</h3>

            <div className="card card-body">
                <h5>Customer Information</h5>

                <div className="mb-3">
                    <label className="form-label">Choose Customer Type</label>
                    <select className="form-select" id="customerType" name="customerType" onChange={(e) => setCustomerType(e.target.value)}>
                        <option>Select Type</option>
                        <option value="1">New Customer</option>
                        <option value="2">Existing Customer</option>
                    </select>
                </div>

                <div className="existing-customer-form" ref={existingCustomerForm}>
                    <div className="mb-3">
                        <label className="form-label">Customer ID</label>
                        <select className="form-select" onChange={handleCustomerChange}>
                            <option selected>Select Customer</option>
                            {customers && customers.map((val, index) => (
                                <option key={index} value={val.id}>{val.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="new-customer-form" ref={newCustomerForm}>
                    <div className="mb-3">
                        <label htmlFor="customerNameInput" className="form-label">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerNameInput"
                            placeholder="Customer name"
                            value={customerData.name}
                            onChange={(e) => {
                                setCustomerData({ ...customerData, name: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerContactInput" className="form-label">
                            Customer Contact
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerContactInput"
                            placeholder="Customer Contact"
                            value={customerData.contact}
                            onChange={(e) => { setCustomerData({ ...customerData, contact: e.target.value }) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerAddressInput" className="form-label">
                            Customer Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerAddressInput"
                            placeholder="Customer Address"
                            value={customerData.address}
                            onChange={(e) => { setCustomerData({ ...customerData, address: e.target.value }) }}
                        />
                    </div>
                </div>
            </div>

            <div className="card card-body mt-3">
                Items
                <BillItems />
            </div>
        </div>
    );
};

export default GenerateBill;