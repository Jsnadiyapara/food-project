import '../../index.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('backend_token');
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="row">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <span className='fs-3 fw-bold text-light'>Admin Panel</span>
                            <hr className='text-light' />
                            <li className="nav-item">
                                <Link className="nav-link text-light active" to="/admin">
                                    <span data-feather="home"></span>
                                    Dashboard
                                </Link>
                            </li>
                           
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/admin/food">
                                    <span data-feather="shopping-cart"></span>
                                    Foods
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/admin/users">
                                    <span data-feather="users"></span>
                                    Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-light bg-dark border-0" onClick={handleLogout}>
                                    <span data-feather="log-out"></span>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
