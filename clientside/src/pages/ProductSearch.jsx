import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProductSingle from "../components/ProductSingle";
import Footer from "../components/Footer";
import Retro from "../Assets/gh4.webp";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../Redux/apiCalls"; // Adjust the import path as needed

const BackgroundContainer = styled.div`
  position: relative;
  background-image: url(${Retro});
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2; /* Ensure content is above the dark overlay */
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.37); /* Adjust the opacity as needed */
  z-index: 1; /* Ensure it's above the background image but below other content */
`;

const Title = styled.h1`
  margin: 20px;
  font-size: 50px;
  color: white;
  font-weight: 400;
  border-bottom: 2px solid white;
`;

const ProductSearch = () => {
  const { pathname } = useLocation();
  const searchQuery = pathname.split("/")[2]; // Extracting search query from the URL

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (query) => {
    setLoading(true);
    const data = await searchProducts(query);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchProducts(searchQuery);
    }
  }, [searchQuery]);

  return (
    <BackgroundContainer>
      <DarkOverlay />
      <ContentContainer>
        <Navbar />
        <Title>You Searched For "{searchQuery}"</Title>
        {loading ? <p>Loading...</p> : <ProductSingle products={products} />}
        <Footer />
      </ContentContainer>
    </BackgroundContainer>
  );
};

export default ProductSearch;
