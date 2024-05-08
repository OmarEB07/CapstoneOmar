import React from 'react';
import styled from "styled-components";
import slide from "../Assets/slidee.gif";
import { BrowserRouter as Router, Route, Routes, Navigate, Link} from "react-router-dom";

const  Container= styled.div`
    position: relative;
    flex: 1;
    margin: 3px;
    height: 70vh;

`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
  
`;

const Shine = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${slide});
  background-size: cover;
  opacity: 0.1;
`;

const Image = styled.img`  
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

const Title = styled.h1`
font-family: 'Silkscreen', cursive;
font-weight:400 ;
font-size: 48px;
    margin-bottom: 20px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add the text shadow here */


`;


const Info = styled.div`
  flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
`;

const Button = styled.button`
   text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Add the text shadow here */
   font-weight: 600;
   border :none ;
   padding: 10px;
   background-color: #26f5fe;
   font-size: 20px;
   border: solid  black;
   border-radius: 5px;
   color: white;
   &:hover{
background-color: #1bacb2;
color: white;
transition: background-color 0.3s ease-in-out;
   }

`;

const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>

        <Image src={item.img}/>
        <Overlay /> 
        <Shine/>
        <Info>
            <Title> {item.title}</Title>

            <Button>SHOP NOW</Button>

        </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem