import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product  from './Product';
import axios from 'axios';

const Container = styled.div`
    background-color: inherit;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
`;


 const Products = ({cat,filters,sort}) => {
  const [products,setProducts] =useState([]);
  const [filteredProducts,setFilteredProducts] =useState([]);
  useEffect(()=>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get(cat 
          ? `http://localhost:4000/api/products?category=${cat}` 
          : "http://localhost:4000/api/products");
          console.log("API Response:", res.data); // Log the raw API response
          setProducts(res.data);

      }catch(err){
        console.error("Failed to fetch products:", err);
      }
    };
getProducts();
  },[cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => {
    
        return Object.entries(filters).every(([key, value]) => {
          const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
          if (arrayMatch) {
            const propertyName = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);
    
            const match = Array.isArray(item[propertyName]) && item[propertyName][index] === value;
    
            return match;
          } else {
            const match = item[key] && (typeof item[key] === 'string' || Array.isArray(item[key])) && item[key].includes(value);
    
            return match;
          }
        });
      })
    );

  },[products,cat,filters]);

useEffect(()=>{
  if(sort === "newest"){
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>a.createdAt - b.createdAt)
      ); 

  } else  if(sort === "asc"){
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>a.price - b.price)
      ); 

  } else {
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>b.price - a.price)
      ); 

  }


},[sort]);

  return (    
    <Container>
{cat 
? filteredProducts.map(item=>(<Product item= {item} key={item._id}/>)) 
: products
.slice(0,10)
.map(item=>(<Product item= {item} key={item._id}/>)) }
    </Container>
  )
}

export default Products