import React from 'react';
import styled, { keyframes } from 'styled-components';

// Create a spin animation using keyframes from styled-components
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create a Loader styled component that uses the spin animation
const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); // Light grey border
  border-left-color: #09f; // Blue color for the spinner
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

// Create a Container to center the spinner
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingScreen = () => (
  <Container>
    <Loader />
  </Container>
);

export default LoadingScreen;
