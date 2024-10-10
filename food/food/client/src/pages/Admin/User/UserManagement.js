import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = "http://localhost:8000/user"; // Update this to your actual API URL

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">User Management</h1>
                <Link to="/admin/users/add" className="btn btn-primary">Add User</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                
                                <td>
                                    <Link to={`/admin/users/${user._id}`} className="btn btn-sm btn-primary me-3">Edit</Link>
                                    <button
                                        className="btn btn-sm btn-danger ml-2"
                                        onClick={() => {
                                            fetch(`${apiUrl}/${user._id}`, {
                                                method: "DELETE",
                                            })
                                                .then((res) => res.json())
                                                .then(() => {
                                                    setUsers(users.filter(u => u._id !== user._id));
                                                })
                                                .catch((error) => console.error('Error deleting user:', error));
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default UserManagement;
