import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { login } from "../Redux/apiCalls";
import { resetError } from "../Redux/userRedux";
import { fetchCart } from "../Redux/cartRedux"; // Adjust path as necessary

// Background images
import backgroundImage1 from "../Assets/castle.jpeg";
import backgroundImage2 from "../Assets/citypixel2.jpg";
import backgroundImage3 from "../Assets/sunset.jpg";
import backgroundImage4 from "../Assets/nature.jpg";
import { useDispatch, useSelector } from "react-redux";

// Keyframes for background animation
const slideBg = keyframes`
  0% {
    background-image: url(${backgroundImage1}) , url(${backgroundImage2});
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
  animation: ${slideBg} 50s linear infinite 0s;
  animation-timing-function: ease-in-out;
`;

const Wrapper = styled.div`
  background-color: white;
  padding: 40px;
  width: 30%;
  border-radius: 30px;
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
  margin-left: 75%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: #0b0b45;
    border: solid 2px #0b0b45;
  }

  &:disabled {
    background-color: #7171a7;
    cursor: not-allowed;
    color: white;
    border: solid 2px #7171a7;
  }
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  margin-top: 15px;
  color: #4528ff;
  font-weight: bold;
  margin-right: 60%;

  &:hover {
    text-decoration: underline;
    transition: text-decoration ease 0.3;
  }
`;

const Link2 = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  margin-top: 15px;
  color: #4528ff;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
  padding-left: 15px;
`;

const SignUpSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  margin-right: 40%;
`;

const SignUpText = styled.span`
  font-size: 18px;
  color: #0b0b45;
`;

const Error = styled.div`
  color: red;
`;

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Local state to handle errors
  const dispatch = useDispatch();
  const { isFetching, currentUser } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    if (!username || !password) {
      setError("Please make sure the fields are not left empty.");
      return;
    }
    try {
      const loginResult = await login(dispatch, { username, password });
      if (loginResult && loginResult._id) {
        setTimeout(() => dispatch(fetchCart(loginResult._id)), 250); // Wait 1 second before dispatching
      }
    } catch (err) {
      setError("Failed to login. Please check your username and password.");
    }
  };

  return (
    <Cont>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Sign In</Title>
          <SignUpSection>
            <div>
              <SignUpText>Don't have an account?</SignUpText>
              <Link2 href="#">Sign Up</Link2>
            </div>
          </SignUpSection>

          <Form>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            {error && <Error>{error}</Error>}
            <Button onClick={handleClick} disabled={isFetching}>
              Sign In
            </Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </Cont>
  );
};

export default Signin;
