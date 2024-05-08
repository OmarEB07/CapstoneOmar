import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getCompanies, getUsers, login } from "../redux/apiCalls";
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
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
      if (currentUser) {
        navigate("/"); // Assuming admin panel route
      }
    } catch (err) {
      setError(err); // Display the backend provided error message
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/"); // Navigate if logged in
    }
  }, [currentUser, navigate]);

  return (
    <Cont>
      <Topbar />
      <Container>
        <LoginForm>
          <Title>Admin Login Page</Title>
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
