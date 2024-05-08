import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { companyLogin } from "../redux/companyRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import Topbar from "../components/Topbar";

const Cont = styled.div``;
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
`;

const LoginForm = styled.div`
  padding: 40px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  width: 100%;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #004494;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold the error message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCompany = useSelector((state) => state.company.currentCompany);

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    dispatch(companyLogin({ username, password }))
      .then(unwrapResult)
      .then(() => {
        navigate("/"); // Navigate to dashboard upon successful login
        setError(""); // Clear any existing error messages
      })
      .catch((err) => {
        // Here we capture the error message and set it to the state
        const errorMessage =
          err.message ||
          "Invalid Username/password please verify your credentials";
        setError(errorMessage);
        console.error("Login error:", errorMessage);
      });
  };

  useEffect(() => {
    if (currentCompany) {
      navigate("/"); // Redirect to the home page if a company is logged in
    }
  }, [currentCompany, navigate]);

  return (
    <Cont>
      <Topbar />
      <Container>
        <LoginForm>
          <Title>Company Login Page</Title>
          {error && <Error>{error}</Error>}
          <StyledInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton onClick={handleClick}>Login</StyledButton>
        </LoginForm>
      </Container>
    </Cont>
  );
};

export default Login;
