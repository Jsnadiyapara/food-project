import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Management</h5>
                            <p className="card-text">Manage users and their roles.</p>
                            <Link to="/admin/users" className="btn btn-primary">Go to Users</Link>
                        </div>
                    </div>
                </div>
               
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Foods</h5>
                            <p className="card-text">Manage Food inventory.</p>
                            <Link to="/admin/food" className="btn btn-primary">Go to Foods</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
