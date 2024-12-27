import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContainer, deleteContainer, setContainerIdz } from "./../../Slicer/ContainerSlicer";
import CreateContainer from "./CreateContainer";
import UpdateContainer from "./UpdateContainer";

const Container = () => {
  
  const IMG_BASE_URL = `${import.meta.env.VITE_BASE_URL}/storage`;
  // const IMG_BASE_URL = `http://lb.app.mystrix.site/uploads`;
  const dispatch = useDispatch();
  const Container = useSelector((state) => state.containers.Container);

  useEffect(() => {
    dispatch(fetchContainer());
  }, [dispatch]);

  const handleInfo = (id)=>{
    console.log(id);
    dispatch(setContainerIdz(id));
  }
  
  const handleDeleteContainer = (id) => {
    dispatch(deleteContainer(id));
  };

  const columnNames = [
    { id: 1, val: "Container ID" },
    { id: 2, val: "Shipment ID" },
    { id: 3, val: "Amount" },
    { id: 4, val: "lc_copy" },
    { id: 5, val: "Status" },
    { id: 6, val: "Action" },
  ];


  return (
    <div>
      <h3>Containers</h3>
      <div className="option-box row">
        <div className="mb-3 col-md-12">
          <CreateContainer />
        </div>
      </div>

      <div className="tables">
        <div className="card">
          <h5 className="card-header">Container List</h5>
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
                {Array.isArray(Container) &&
                  Container.map((val) => (
                    <tr key={val.id}>
                      <td className="text-nowrap">{val.id}</td>
                      <td className="text-nowrap">{val.shipment_id}</td>
                      <td className="text-nowrap">{val.amount}</td>
                      <td className="text-nowrap">
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                          <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            className="avatar avatar-xs pull-up"
                          >
                            <img
                              src={`${IMG_BASE_URL}/${val.lc_copy}`}
                              alt="Avatar"
                              className="rounded-circle"
                            />
                          </li>
                        </ul>
                      </td>
                      <td className="text-nowrap">{val.status}</td>
                      <td className="text-nowrap d-flex align-items-center gap-2">

                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#updateContainerModal"
                          onClick={() => { handleInfo(val.id) }}
                        >
                          Update
                        </button>
                        <UpdateContainer  />


                        <button
                          onClick={() => handleDeleteContainer(val.id)}
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

export default Container;
