import { Send } from '@mui/icons-material'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import Sailing from "../Assets/sailing.gif"
const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  background-image: url(${Sailing});
  background-size: cover;
  background-position: 0px -400px;
  height: 60vh;
  position: relative;

  /* Add a pseudo-element to create the dark overlay */
  &::before {
    content: "";
    position: absolute;
    top: 100;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); /* Adjust the opacity as needed */
    z-index: 1; /* Ensure it's above the background image but below other content */
  }


  @media (max-width: 768px) {
    background-position: center; // adjust as needed
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }


`

const Title = styled.h1`
  font-family: 'Silkscreen', cursive;
font-weight:400 ;
  color: white;
  margin-bottom:20px;
  font-size: 70px;
  border-bottom: 5px solid white;
  padding: 5px;
  z-index: 2; /* Ensure the title is above the dark overlay */

  @media (max-width: 768px) {
    font-size: 50px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }


`

const Desc = styled.div`
  color: white;
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 24px;
  z-index: 2; /* Ensure the description is above the dark overlay */

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }


`

const InputContainer = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: white;
  height: 40px;
  width: 50%;
  border: 1px solid lightgrey;
  position: relative;
  z-index: 2; /* Ensure the input container is above the dark overlay */

  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }

`

const Input = styled.input`
  padding-left: 20px;
  flex: 8;
  border: 2px solid #ccc;
  transition: border-color 0.3s;


&:focus{
  border-color: #4528ff;
    outline: none;
}
`

const Button = styled.button`
  background-color: #0b0b45;
  border: none;
  flex: 1;
  color: white;

  &:hover{
    background-color: #1312c5;
    transition: background-color 0.3s ease-in-out;
  }


`

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates for any of our upcoming product releases.</Desc>
      <InputContainer>
        <Input placeholder='xyz@domain.com' />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter
