import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import FeaturedItems from '../components/FeaturedItems';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';


import styled, { keyframes } from 'styled-components';




const Home = () => {


  return (
    <div>
        <Navbar/>
       <Slider/>
       <Categories/>
       <FeaturedItems/>
       <Newsletter/>
       <Footer/>
       
    </div>
  )
}

export default Home;
