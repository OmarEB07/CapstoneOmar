import React from "react";
import styled from "styled-components";
import Products from "./Products";

const Container = styled.div`
  background: linear-gradient(to bottom, #1d2d41, #1a1e23);
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  padding: 55px;

  //background: linear-gradient(to bottom, #3a506b, #2c3a47);
`;
const Title = styled.h1`
  font-family: "Silkscreen", cursive;
  font-weight: 400;
  color: white;
  margin-bottom: 30px;
  font-size: 40px; /* Adjust the title font size as needed */
  text-align: center;
  width: 100%;
  height: auto;
  border-bottom: 5px solid white;
  padding-bottom: 20px;
`;

const FeaturedItems = () => {
  return (
    <>
      <Container>
        <Title>Featured Items</Title>
        <Products />
      </Container>
    </>
  );
};

export default FeaturedItems;
