import {
  Email,
  Facebook,
  Instagram,
  Pinterest,
  Room,
  Smartphone,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import pay from "../Assets/payment.png";
import Lg from "../Assets/logo1.png";
import { Link as RouterLink } from "react-router-dom";

const StyledLink = styled(RouterLink)`
  text-decoration: none; /* Removes the underline */
  color: white; /* Inherits the color from its parent or you can set a specific color */
  &:hover,
  &:focus {
    text-decoration: none; /* Optional: Removes the underline on hover/focus */
    color: white; /* Optional: Change color on hover/focus */
  }
`;

const ContactItem = styled.div`
  color: white;
  align-items: center;
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    // Adjust the breakpoint as needed
    align-items: flex-start;
  }
`;
const Payment = styled.img`
  max-width: 50%;
`;
const Logo = styled.div`
  display: flex; // Use flexbox for alignment
  justify-content: center; // Center horizontally by default
  align-items: center; // Center vertically by default
  width: 100%; // Take the full width of the parent to control the size of the logo

  & > img {
    object-fit: contain;
    width: 30%; // Adjust width as needed
  }

  @media (max-width: 768px) {
    justify-content: center; // Align to the start on smaller screens
    align-items: center; // Keep vertical center alignment on smaller screens
    & > img {
      width: 30%; // Adjust width for smaller screens if needed
    }
  }
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 20px;
  @media (max-width: 768px) {
    // Adjust the breakpoint as needed
    align-items: flex-start;
  }
`;

const SocialIcon = styled.div`
  margin-right: 20px;
  display: flex;
  color: white;
  height: 40px;
  width: 40px;
  cursor: pointer;

  &:hover {
    background-color: #1312c5;
    transition: background-color 0.6s ease-in-out;
  }
`;

const Container = styled.div`
  display: flex;
  background-color: #0b0b45;
  flex-wrap: wrap; // Allow the items to wrap in smaller screens
  align-items: center;
  @media (max-width: 768px) {
    // Adjust the breakpoint as needed
    flex-direction: column;
    align-items: center;
  }
`;
const Title = styled.h3`
  color: white;
  margin-bottom: 30px;
  position: relative; /* Required for pseudo-element */

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px; /* Adjust as needed to position the border properly */
    width: 29%; /* Makes the border span the entire width of the text */
    height: 1px;
    background-color: white;
  }
`;

const Title2 = styled.h3`
  color: white;
  margin-bottom: 30px;
  position: relative; /* Required for pseudo-element */

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px; /* Adjust as needed to position the border properly */
    width: 12%; /* Makes the border span the entire width of the text */
    height: 1px;
    background-color: white;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; // Allow the list to wrap in smaller screens
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const ListItem = styled(RouterLink)`
  width: 100%; // Full width on smaller screens
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  border-bottom: transparent 1px solid; /* Start with a transparent border */
  text-decoration: none;
  @media (min-width: 768px) {
    width: 40%; // Adjust width on larger screens
  }

  &:hover {
    border-bottom: white 1px solid;
    transition: border-bottom 0.3s ease;
  }
`;

const Left = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Right = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  flex: 1;
  border-left: 1px solid white;

  @media (max-width: 768px) {
    align-items: flex-start; // Align items to the start on smaller screens
    flex-direction: column;
    border-left: none;
    border-top: 1px solid white;
  }
`;
const Center = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-left: 1px solid white;
  align-items: center;
  @media (max-width: 768px) {
    align-items: center;
    border-top: 1px solid white;
    border-left: none;
  }
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Title>Our Website's Links</Title>
        <List>
          <ListItem to="/">Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem to={`/order-history`}>Order Tracking</ListItem>
          <ListItem to={`/products/VideoGames`}>Browse Videogames</ListItem>
          <ListItem to={`/products/Movies`}>Browse Movies</ListItem>
          <ListItem to={`/products/FanMerch`}>Browse Merch</ListItem>
          <ListItem to={`/ask`}>AI ChatBot Assistant</ListItem>
        </List>
      </Left>

      <Center>
        <Logo>
          <img src={Lg} alt="Logo" />
        </Logo>

        <SocialContainer>
          <SocialIcon>
            <Facebook style={{ fontSize: 40 }} />
          </SocialIcon>
          <SocialIcon>
            <Instagram style={{ fontSize: 40 }} />
          </SocialIcon>
          <SocialIcon>
            <Pinterest style={{ fontSize: 40 }} />
          </SocialIcon>
          <SocialIcon>
            <Twitter style={{ fontSize: 40 }} />
          </SocialIcon>
        </SocialContainer>
      </Center>

      <Right>
        <Title2>Contact</Title2>

        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          427 Grove, Los Santos 14116
        </ContactItem>

        <ContactItem>
          <Smartphone style={{ marginRight: "10px" }} />
          +248 434 5508
        </ContactItem>

        <ContactItem>
          <Email style={{ marginRight: "10px" }} />
          TF22@pxvault.com
        </ContactItem>
        <Payment src={pay} />
      </Right>
    </Container>
  );
};

export default Footer;
