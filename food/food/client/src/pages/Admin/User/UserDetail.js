import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const apiUrl = "http://localhost:8000/user"; // Update this to your actual API URL

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`${apiUrl}/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setUser(data); // Ensure the fetched data is set to the state
                })
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, [id]);

    const handleSave = () => {
        const method = id ? "PUT" : "POST";
        const url = id ? `${apiUrl}/edit/${id}` : `${apiUrl}/add`;

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(() => {
                navigate('/admin/users');
            })
            .catch((error) => console.error(`Error ${id ? 'editing' : 'adding'} user:`, error));
    };

    const handleDelete = () => {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                navigate('/admin/users');
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{id ? 'Edit User' : 'Add User'}</h1>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control  border border-warning"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control  border border-warning"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control border border-warning"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSave}>{id ? 'Save Changes' : 'Add User'}</button>
            
        </main>
    );
};

export default UserDetail;
