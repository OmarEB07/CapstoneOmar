import React from 'react';
import styled from "styled-components";
import Product from './Product';

const Container = styled.div`
    background-color: inherit;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
`;

const ProductSingle = ({ products }) => {
  return (    
    <Container>
      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default ProductSingle;
