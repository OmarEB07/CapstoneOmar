import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SportsEsportsOutlined,
  TheaterComedyOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip from Material-UI
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const StyledLink = styled(RouterLink)`
  text-decoration: none; /* Removes the underline */
  color: black;
  &:hover,
  &:focus {
    text-decoration: none; /* Optional: Removes the underline on hover/focus */
    color: white; /* Optional: Change color on hover/focus */
  }
`;

const Info = styled.div`
  transition: all 0.5s ease;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  left: 0;
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  height: 350px;
  min-width: 280px;
  flex: 1;
  margin: 5px;
  display: flex;
  //background: linear-gradient(to bottom, #1d2d41, #1a1e23);
  background: linear-gradient(to bottom, #3a506b, #2c3a47);

  position: relative;
  border: 4px solid #5a7184;
  border-style: outset;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  z-index: 1;
  height: 75%;
  max-width: 100%; /* Add this line */
  object-fit: contain;
  border-radius: 8px;
  border: 2px solid cyan;
  background-color: #f0f0f3; /* Light background color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
`;

const Icon = styled.div`
  margin: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #0b0b45;
    transform: scale(1.1);
    color: white;
  }
`;

const GameIcon = styled.div`
  margin: 10px;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: blue;
  transform: scale(1.1);
  color: white;
`;

const MovieIcon = styled.div`
  margin: 10px;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: red;
  transform: scale(1.1);
  color: white;
`;
const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  z-index: 2;
`;

const IconWrapper = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  margin-right: 5px;
`;

const Genre = styled.div`
  position: absolute; // Position absolutely within the relative container
  bottom: 10px; // Distance from the bottom of the container
  right: 10px; // Distance from the right of the container
  background-color: orange;
  padding: 5px 10px; // Adjust padding to fit the content
  color: white;
  border-radius: 15px;
  font-size: 12px; // Adjust font size as needed
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SaleBadge = styled.div`
  background-color: red;
  color: white;
  width: 55px; // Larger to fit text
  height: 55px;
  clip-path: polygon(
    0% 0%,
    /* top left */ 100% 0%,
    /* top right */ 100% 50%,
    /* middle right */ 75% 100%,
    /* bottom right */ 25% 100%,
    /* bottom left */ 0% 50% /* middle left */
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

// Usage in component:

const Console = styled.div`
  position: absolute; // Position absolutely within the relative container
  bottom: 10px; // Distance from the bottom of the container
  right: 10px; // Distance from the right of the container
  background-color: blue;
  padding: 5px 10px; // Adjust padding to fit the content
  color: white;
  border-radius: 15px;
  font-size: 12px; // Adjust font size as needed
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />

      <IconContainer>
        {item.categories.includes("VideoGames") && (
          <IconWrapper color="blue">
            <SportsEsportsOutlined />
          </IconWrapper>
        )}
        {item.categories.includes("Movies") && (
          <IconWrapper color="red">
            <TheaterComedyOutlined />
          </IconWrapper>
        )}
        {item.categories.includes("FanMerch") && (
          <IconWrapper color="#20e475">
            <SmartToyOutlined />
          </IconWrapper>
        )}
      </IconContainer>
      {item.onSale && (
        <SaleBadge>{Math.round(item.salePercentage * 100)}% Off</SaleBadge>
      )}

      <Genre>{item.categories[1]}</Genre>
      <Info>
        <Tooltip
          title="View Product"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "#0b0b45",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
              },
            },
          }}
        >
          <Icon>
            <StyledLink to={`/product/${item._id}`}>
              <SearchOutlined />
            </StyledLink>
          </Icon>
        </Tooltip>
      </Info>
    </Container>
  );
};

export default Product;
