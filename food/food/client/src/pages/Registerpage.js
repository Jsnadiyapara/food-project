import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { toast } from "react-toastify";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const apiUrl = "http://localhost:8000/user/register";

function RegisterUser() {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data, [name]: value,
        });
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password, password_confirmation } = data;

        if (!username || !email || !password || !password_confirmation) {
            toast.error("Please fill all the fields");
            return;
        }

        if (password !== password_confirmation) {
            toast.error("Password and Confirm Password do not match");
            return;
        }
        const formData = { username, email, password };
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
                throw new Error(errorData.message || "Registration failed");
            }

            toast.success("Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleSubmit}>
                                    <div className="text-center pb-2"><h1>Register</h1></div>
                                    <div className="text-center pb-2"><h5 className="text-body-secondary">Create your account</h5></div>
                                    <CInputGroup className="mb-3">

                                        <CFormInput type="text"
                                            name="username"
                                            autoComplete="off"
                                            className="  form-control form-control-lg border border-primary"
                                            placeholder="Enter a Username"
                                            value={data.username}

                                            onChange={handleInput} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">

                                        <CFormInput type="email"
                                            name="email"
                                            autoComplete="off"
                                            className="form-control form-control-lg border border-primary"
                                            placeholder="Enter an Email"

                                            value={data.email}
                                            onChange={handleInput} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">

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
                                    <CInputGroup className="mb-4">

                                        <CFormInput
                                            type="password"
                                            name="password_confirmation"
                                            autoComplete="off"
                                            className="form-control form-control-lg border border-primary"
                                            placeholder="Enter Confirm Password"

                                            value={data.password_confirmation}
                                            onChange={handleInput}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" type="submit">Create Account</CButton>
                                    </div>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        have an account ?{" "}
                                        <a href="/login" className="link-danger">
                                            Login
                                        </a>
                                    </p>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default RegisterUser;
