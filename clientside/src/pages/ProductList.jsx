import React, { useState } from 'react';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Footer from '../components/Footer';
import Retro from '../Assets/peak.jpg';
import Synth from '../Assets/synth.gif'
import { useLocation } from 'react-router-dom';
import { categories } from '../data'; // Make sure the path is correct


const BackgroundContainer = styled.div`
  position: relative;
  background-image: url(${props => props.bgImage});
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



const Option = styled.option`
    
    background-color: #4b72a3 ;
    color: white;

    &:disabled {
background-color: black;
color: white;
font-weight: bold;
}



`;


const Select = styled.select`
    font-size: 20px;
    margin-right: 20px;
    padding: 10px;
    background-color: #4b72a3 ;
    color: white;
    border: 1px solid;
border-style: outset;
font-weight: 500;
transition: background-color 0.3s ease-in-out;

&:focus {
    outline: none; 
  }

    &:hover{
        background-color: #171791;
        color: white;
        transition: background-color 0.3s ease-in-out;
        border-color: white;
        cursor: pointer;

    }
   

    
`;

const Title = styled.h1`
    margin: 20px;
    font-size: 50px;
    border-bottom: 2px solid white;
    color: white;
    font-family: 'Silkscreen', cursive;
font-weight:400 ;
`;

const FilterContainer = styled.div`
    justify-content: space-between;
    display: flex;

`;
const Filter = styled.div`
   margin: 20px; 

`;
const FilterText = styled.span`
    margin-right: 20px;
    font-size: 20px;
    font-weight: 600;
    color: white;

`;


const ProductList = () => {
const location = useLocation();
const cat = location.pathname.split("/")[2];
const [filters, setFilters] = useState({});
const [sort, setSort] = useState("Newest");

// Find the category object from categories data that matches the current cat
const categoryTitleObject = categories.find(c => c.cat === cat);
// Use the title from the categoryTitleObject, if it's not found, use 'cat' as a fallback
const title = categoryTitleObject ? categoryTitleObject.title : cat;

// Find the category object from categories data that matches the current cat
const categoryObject = categories.find(c => c.cat === cat);
// Get the background image from the categoryObject
const bgImage = categoryObject ? categoryObject.background : Retro; // Fallback to Retro if no image found


const handleFilters = (e) => {
  const value = e.target.value;
  const name = e.target.name;

  // Assuming the 'name' attribute of your genre select is 'Genre' and for consoles is 'Console'
  if (name === "Genre") {
    // Assuming you want to filter by the first genre in the categories array
    const filterKey = 'categories[1]';
    setFilters({
      ...filters,
      [filterKey]: value,
    });
  } else if (name === "Console") {
    // For console, since it's an array, we check for inclusion in the array
    setFilters({
      ...filters,
      console: value,
    });
  }
};
  return (
    
    <BackgroundContainer bgImage={bgImage}>
       
       <DarkOverlay/>
       <ContentContainer>
        <Navbar/>
        <Title>{title}</Title>
        <FilterContainer>
         
         <Filter>
            <FilterText>Filter Products:</FilterText>
            {cat === "VideoGames" && (
  
            <Select name= "Console" onChange={handleFilters}>
                <Option disabled> 
                Console
                </Option>
                <Option>Playstation</Option>
                <Option>Xbox</Option>
                <Option>Nintendo</Option>
                <Option>PC</Option>
            </Select>
            )}
              <Select name="Genre" onChange={handleFilters}>
                  <Option disabled>Genre</Option>
                     {/* Options for all categories */}
                     <Option>Action</Option>
                     <Option>Adventure</Option>

                   { cat =="Movies" &&(
                     <>
                    <Option>TV Series</Option>
                    <Option>RomCom</Option>
                    <Option>Documentary</Option>
                    </>

                   )}

             {/* Additional options for the "VideoGames" category */}
                {cat === "VideoGames" && (
                       <>
                      <Option>Rpg</Option>
                      <Option>Multiplayer</Option>
                      <Option>Exploration</Option>
                      </>
               )}
            </Select>
            </Filter>


         <Filter>
            
            <FilterText>Sort Products:</FilterText>

            <Select onChange={e=>setSort(e.target.value)}>
                <Option value="newest"> 
                Newest
                </Option>
                <Option  value="asc">Lowest to Highest Price (asc)</Option>
                <Option  value="desc">Highest to Lowest Price (desc)</Option>
                
            </Select>
            
            </Filter>
            
        </FilterContainer>

        <Products cat={cat} filters={filters} sort={sort}/>
        <Footer/>

        </ContentContainer>
    </BackgroundContainer>
  )
}

export default ProductList
