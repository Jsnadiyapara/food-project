    import React, { useState } from "react";
    import { useNavigate, Link } from "react-router-dom";
    import Cookies from 'js-cookie';
    import {
        CButton,
        CCard,
        CCardBody,
        CCardGroup,
        CCol,
        CContainer,
        CForm,
        CFormInput,
        CInputGroup,
        CRow,
    } from '@coreui/react';
    import { toast } from "react-toastify";
    import { useAuth } from "../context/auth.js";

    const apiUrl = "http://localhost:8000/user/login";

    function Login_user() {
        const [auth, setAuth] = useAuth();
        const [data, setData] = useState({
            email: "",
            password: "",
        });
        const navigate = useNavigate();

        const handleInput = (e) => {
            const { name, value } = e.target;
            setData({
                ...data, 
                [name]: value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            const { email, password } = data;

            if (!email || !password) {
                toast.error("Please enter all fields");
                return;
            }

            const formData = { email, password };

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Login failed");
                }

                const Data = await response.json();
                setAuth({ ...auth, user: Data.user, token: Data.token, role: Data.role });
                Cookies.set("backend_token", JSON.stringify(Data));
                toast.success("Login Successfully");

                if (Data.role === 1) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

            } catch (error) {
                console.error("Error during login:", error);
                toast.error(`An error occurred: ${error.message}`);
            }
        };

        return (
            <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm onSubmit={handleSubmit}>
                                            <div className="text-center pb-2">
                                                <h1>Login</h1>
                                            </div>
                                            <div className="text-center pb-2">
                                                <h5 className="text-body-secondary">Sign In to your account</h5>
                                            </div>
                                            <CInputGroup className="mb-3">
                                                <CFormInput
                                                    type="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    className="form-control form-control-lg border border-primary"
                                                    placeholder="Enter an Email"
                                                    value={data.email}
                                                    onChange={handleInput}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CFormInput
                                                    type="password"
                                                    name="password"
                                                    autoComplete="off"
                                                    className="form-control form-control-lg border border-primary"
                                                    placeholder="Enter a Password"
                                                    value={data.password}
                                                    onChange={handleInput}
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton color="primary" type="submit" className="px-4">
                                                        Login
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={6} className="text-right">
                                                    <CButton color="link" className="px-0">
                                                        Forgot password?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                    <CCardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Create a New Account</p>
                                            <Link to="/register">
                                                <CButton color="primary" className="mt-3 border border-light" active tabIndex={-1}>
                                                    Register Now!
                                                </CButton>
                                            </Link>
                                        </div>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        );
    }

    export default Login_user;
