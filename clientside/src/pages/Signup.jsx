import React from "react";
import styled, { keyframes } from "styled-components";
import backgroundImage1 from "../Assets/mountain.jpg";
import backgroundImage2 from "../Assets/gh3.jpg";
import backgroundImage3 from "../Assets/neighborhood.jpg";
import backgroundImage4 from "../Assets/forest.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/apiCalls";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const slideBg = keyframes`
  0% {
    background-image: url(${backgroundImage1}), url(${backgroundImage2});
  }
  25% {
    background-image: url(${backgroundImage2}), url(${backgroundImage3});
  }
  50% {
    background-image: url(${backgroundImage3}), url(${backgroundImage4});
  }
  75% {
    background-image: url(${backgroundImage4}), url(${backgroundImage1});
  }
  100% {
    background-image: url(${backgroundImage1});
  }
`;

const Cont = styled.div`
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  backface-visibility: hidden;
  animation: ${slideBg} 45s linear infinite 0s;
  animation-timing-function: ease-in-out;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 40px;
  width: 30%;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 30px;
  color: #0b0b45;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  padding: 15px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 30px;
  font-size: 18px;
  transition: border-color 0.3s;
  color: black;
  &:focus {
    border-color: #4528ff;
    outline: none;
    color: black;
  }

  &::placeholder {
    color: grey;
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: white;
  padding: 15px 30px;
  border: solid 2px;
  background-color: #0b0b45;
  border-radius: 15px;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 60%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: #0b0b45;
    border: solid 2px #0b0b45;
  }
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  margin-top: 15px;
  color: #4528ff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-right: 50%;
`;

const SignInText = styled.span`
  font-size: 18px;
  color: #0b0b45;
  margin-right: 10px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HalfWidthInput = styled(Input)`
  flex: 1;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;
const Error = styled.div`
  color: red;
`;

const Signup = () => {
  // State setup
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    if (!firstname || !lastname || !username || !email || !password) {
      setError("Please make sure the fields are not left empty.");
      return;
    } else if (password !== confirmPassword) {
      setError("Please make sure the passwords match.");
      return;
    }

    try {
      const result = await register(dispatch, {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      if (result) {
        // Redirect or handle the login screen transition
        console.log("Registration successful:", result);
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <Cont>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Create an Account</Title>
          {error && <Error>{error}</Error>}
          <Form onSubmit={handleRegister}>
            {/* Inputs and form controls */}
            <InputWrapper>
              <InputRow>
                <HalfWidthInput
                  type="text"
                  placeholder="First name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <HalfWidthInput
                  type="text"
                  placeholder="Last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </InputRow>
              <InputRow>
                <HalfWidthInput
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <HalfWidthInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputRow>
              <InputRow>
                <HalfWidthInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <HalfWidthInput
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputRow>
            </InputWrapper>
            <Button type="submit" disabled={isFetching}>
              Create Account
            </Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </Cont>
  );
};

export default Signup;
