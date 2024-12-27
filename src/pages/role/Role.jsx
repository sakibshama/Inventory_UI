import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole, fetchRoles, setRoleId } from "../../Slicer/RoleSlicer";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";


function Role() {

    const dispatch = useDispatch();
    const  roles  = useSelector((state) => state.roles.roles);
    const isChanged = useSelector((state) => state.roles.isChanged);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch, isChanged]);

    const handleDeleteRole = (id) => {
        dispatch(deleteRole(id));
    };

    const handleInfo = (id)=>{
        dispatch(setRoleId(id));
    }

    const columnNames = [
        { id: 1, val: "Role ID" },
        { id: 1, val: "Roll Name" },
        { id: 2, val: "Permissions" },
        { id: 3, val: "Status" },
        { id: 4, val: "Action" }
    ];

    return (
        <div>
            <h3>Roles</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateRole />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">List Of Role</h5>
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
                                {Array.isArray(roles) && roles.map((val) => (
                                    <tr key={val.id}>
                                        <td className="text-nowrap">{val.id}</td>
                                        <td className="text-nowrap">{val.role_name}</td>
                                        <td className="text-nowrap">{val.permissions}</td>
                                        <td className="text-nowrap">{val.status}</td>

                                        <td className="text-nowrap d-flex align-items-center gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateBrandModal"
                                                onClick={()=>{handleInfo(val.id)}}
                                            >
                                                <i className="bx bxs-edit"></i>
                                            </button>
                                            <UpdateRole />
                                            <button
                                                onClick={() => handleDeleteRole(val.id)}
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

export default Role