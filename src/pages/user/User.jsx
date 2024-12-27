import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, setUserId } from "../../Slicer/UserSlicer";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

function User() {

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users);
    const isChanged = useSelector((state) => state.users.isChanged);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, isChanged]);

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };

    const hanleInfo = (id)=>{
        dispatch(setUserId(id));
    }

    const columnNames = [
        { id: 1, val: "User ID" },
        { id: 2, val: "Role" },
        { id: 3, val: "Name" },
        { id: 4, val: "Email" },
        { id: 5, val: "Gender" },
        { id: 6, val: "Phone" },
        { id: 7, val: "C% (Percentage)" },
        { id: 8, val: "C Amount" },
        { id: 9, val: "Image" },
        { id: 10, val: "Status" },
        { id: 11, val: "Actions" },
    ];

    const handleInfo = (id) => {
        dispatch(setUserId(id));
    };

    return (
        <div>
            <h3>Users</h3>
            <div className="option-box row">
                <div className="mb-3 col-md-12">
                    <CreateUser />
                </div>
            </div>

            <div className="tables">
                <div className="card">
                    <h5 className="card-header">User List</h5>
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
                                {Array.isArray(users) &&
                                    users.map((val) => (
                                        <tr key={val.id}>
                                            <td className="text-nowrap">{val.id}</td>
                                            <td className="text-nowrap">{val.role.role_name}</td>
                                            <td className="text-nowrap">{val.name}</td>
                                            <td className="text-nowrap">{val.email}</td>
                                            <td className="text-nowrap">{val.gender}</td>
                                            <td className="text-nowrap">{val.phone}</td>
                                            <td className="text-nowrap">{val.c_percentage}</td>
                                            <td className="text-nowrap">{val.c_amount}</td>
                                            <td className="text-nowrap">
                                                <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                    <li
                                                        data-bs-toggle="tooltip"
                                                        data-popup="tooltip-custom"
                                                        data-bs-placement="top"
                                                        className="avatar avatar-xs pull-up"
                                                    >
                                                        <img
                                                            src={`${import.meta.env.VITE_BASE_URL}/storage/${val.image}`}
                                                            alt="Avatar"
                                                            className="rounded-circle"
                                                        />
                                                    </li>
                                                </ul>
                                            </td>
                                            <td className="text-nowrap">
                                                {val.status ? (
                                                    <span className="badge bg-success">Active</span>
                                                ) : (
                                                    <span className="badge bg-danger">Inactive</span>
                                                )}
                                            </td>
                                            <td className="text-nowrap d-flex align-items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updateUserModal"
                                                    onClick={() => handleInfo(val.id)}
                                                >
                                                    <i className="bx bxs-edit"></i>
                                                </button>
                                                <UpdateUser />

                                                <button
                                                    onClick={() => handleDeleteUser(val.id)}
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

export default User;
