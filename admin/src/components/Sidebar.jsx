import React from 'react';
import styled from 'styled-components';
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  BusinessCenterOutlined,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom'; // Use NavLink for active state

// Styled Components
const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;

const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`;

const SidebarListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;

const SidebarIcon = styled.span`
  margin-right: 5px;
  font-size: 20px;
`;



const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  
  &:hover, &.active {
    background-color: rgb(240, 240, 255); // This is your hover and active background color
  }
  
  &.active {
    // Here you can define styles specifically for the active state
    background-color: rgb(240, 240, 255);
  }
  
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;
export default function Sidebar() {

  
  
  
  return (
    <SidebarContainer>
      <SidebarWrapper>
        {/* Dashboard Menu */}
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
          <StyledNavLink to="/"  activeClassName="active">
              <SidebarListItem>
                <SidebarIcon as={LineStyle} />
                Home
              </SidebarListItem>
              </StyledNavLink>
          
          </SidebarList>
        </SidebarMenu>

        {/* Quick Menu */}
        <SidebarMenu>
          <SidebarTitle>Products Menu</SidebarTitle>
          <SidebarList>
          <StyledNavLink to="/products" end activeClassName="active">
              <SidebarListItem>
                <SidebarIcon as={Storefront} />
                Products
              </SidebarListItem>
            </StyledNavLink>
           
          </SidebarList>
        </SidebarMenu>


        {/* Products Menu */}
        <SidebarMenu>
          <SidebarTitle>Users Menu</SidebarTitle>
          <SidebarList>
           
            
            <StyledNavLink to="/users" end activeClassName="active">
              <SidebarListItem>
                <SidebarIcon as={PermIdentity} />
                Users
              </SidebarListItem>
            </StyledNavLink>
            

          </SidebarList>
        </SidebarMenu>


              {/*Company */}
        <SidebarMenu>
          <SidebarTitle>Company Menu</SidebarTitle>
          <SidebarList>
          <StyledNavLink to="/companies" end activeClassName="active">
              <SidebarListItem>
                <SidebarIcon as={BusinessCenterOutlined} />
                Companies
              </SidebarListItem>
            </StyledNavLink>
           
          </SidebarList>
        </SidebarMenu>


      </SidebarWrapper>
    </SidebarContainer>
  );
}
