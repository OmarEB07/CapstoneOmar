import React from 'react'
import styled from "styled-components"
import { categories } from '../data'
import CategoryItem from './CategoryItem'


const  Container= styled.div`
    justify-content: space-between;
    padding: 20px;
    display: flex;
    background: linear-gradient(to bottom, #1d2d41, #1a1e23);
    
    @media (max-width: 768px) { // Adjust the breakpoint as needed
      flex-direction: column;

  }
`

const Categories = () => {
  return (
    <Container>

{categories.map(item=>(
    <CategoryItem item={item} key={item.id}/>
))}

    </Container>
  )
}

export default Categories