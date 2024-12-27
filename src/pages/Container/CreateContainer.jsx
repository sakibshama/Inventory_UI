import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import  {createContainer}  from "./../../Slicer/ContainerSlicer";

const CreateContainer = () => {
  const dispatch = useDispatch();
  const dimissModal = useRef();
  const [ContainerData, setContainerData] = useState({
    shipment_id: null,
    amount: null,
    lc_copy: null,
    status:1
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setContainerData({ ...ContainerData, lc_copy: file });
  };

  const handleCreateContainer = () => {
    console.log(ContainerData);

    dispatch(createContainer(ContainerData))
      .then((res) => {
        console.log(res);
        
        // Close the modal after Container is created
        dimissModal.current.click();
      })
      .catch((err) => {
        console.error("Error creating Container:", err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createContainerModal"
      >
        Add Container
      </button>

      <div
        className="modal fade"
        id="createContainerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createContainerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createContainerLabel">
                Add a New Container
              </h5>
              <button
                type="submit"
                ref={dimissModal}
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
                <label htmlFor="ContainerNameInput" className="form-label">
                  Shipment ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ContainerNameInput"
                  placeholder="E.g. Asus"
                  value={ContainerData.shipment_id}
                  onChange={(e) => {
                    setContainerData({ ...ContainerData, shipment_id: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ContainerNameInput" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ContainerNameInput"
                  placeholder="E.g. Asus"
                  value={ContainerData.amount}
                  onChange={(e) => {
                    setContainerData({ ...ContainerData, amount: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ContainerImageFile" className="form-label">
                  LC Copy Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="ContainerImageFile"
                  onChange={handleImageChange}
                />
                <p className="lead mt-2">
                  Please make sure the image ratio is 1050px * 600px!
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCreateContainer}
                type="button"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
