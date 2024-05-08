import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Badge } from '@mui/material';
import { Search, ShoppingCartOutlined, LoginOutlined } from '@mui/icons-material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageLogo from '../Assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/userRedux';
import { createTheme } from '@mui/material/styles';
import { Link as RouterLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../Redux/store'; // adjust the import path according to your file structure
import { cartActions } from '../Redux/cartRedux';
import { searchProducts } from '../Redux/apiCalls'; // Adjust the import path as needed

const StyledLink = styled(RouterLink)`
  text-decoration: none; /* Removes the underline */
  color: white; /* Inherits the color from its parent or you can set a specific color */
  &:hover, &:focus {
    text-decoration: none; /* Optional: Removes the underline on hover/focus */
    color: white; /* Optional: Change color on hover/focus */
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #32496f;
  font-size: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  max-height: ${(props) => (props.isOpen ? '200px' : '0')}; /* Control the max height */
  overflow: hidden; /* Hide overflow when closed */
  transition: all 0.3s ease-in-out; /* Transition for both opacity and max-height */
`;
const DropdownItem = styled.div`
  color: white;
  padding: 12px 10px;
  min-width: 100px;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #1b273c;
  }
`;

const Account = styled.div`
  margin-left: 25px;
  font-size: 25px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #1312c5;
    transition: background-color 0.3s ease-in-out;
  }
  &:hover ${DropdownContent} {
    display: block;
  }
`;
const MenuItem = styled.div`
  margin-left: 25px;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    background-color: #1312c5;
    transition: background-color 0.6s ease-in-out;
  }
`;

const Logo = styled.div`
  & > img {
    object-fit: contain;
    max-width: 30%;
  }
`;



const SearchContainer = styled.div`
  margin-left: 25px;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Container = styled.div`
  max-height: 20vh;
  background-color: #0b0b45;
  color: white;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  justify-content: flex-end;
  flex: 1;
  display: flex;
  align-items: center;

  &:link{
    outline: none;
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 5px;
  background-color: #48487f;
  border: 1px solid #48487f;
  border-radius: 5px;
  transition: border-color 0.3s;
  transition: background-color 0.4s;
  color: white;

  &:focus {
    border-color: white;
    outline: none;
    background-color: white;
    color: black;


  }

  &::placeholder{
    color: white;

    
  }

  
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const quantity = useSelector(state => state.cart?.quantity || 0);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();  // Use useNavigate hook


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    if (searchInput.trim()) {
      navigate(`/search/${searchInput.trim()}`); // Navigate to the search page
    }
  };


  const handleLogout = () => {
    dispatch(logout());
    dispatch(cartActions.clearCart());

    persistor.purge().then(() => {
      console.log('Purged persist store');

      
  });
  navigate('/'); // Redirect to login page

  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <StyledLink to="/">
          <Logo>
            <img src={ImageLogo} alt="Logo" />
          </Logo>
          </StyledLink>
        </Left>

        <Center></Center>

        <Right>
        <SearchContainer as="form" onSubmit={handleSearch}>
        <Search />
        <StyledInput
                placeholder='Search'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}/>
         </SearchContainer>
          <Account
            onMouseEnter={() => setIsAccountOpen(true)}
            onMouseLeave={() => setIsAccountOpen(false)}
          >
            <AccountCircleIcon style={{ marginRight: '5px' }}/>
            Account
            <DropdownContent isOpen={isAccountOpen}>
                    {currentUser ? (
                        <>
                            {/* Add more dropdown items here */}
                            <DropdownItem onClick={handleLogout}>
                                <LoginOutlined style={{ marginRight: '5px' }} />
                                Sign Out
                            </DropdownItem>
                        </>
                    ) : (
                        <>
                            <DropdownItem>
                                <LoginOutlined style={{ marginRight: '5px' }} />
                                <StyledLink to="/login">Sign In</StyledLink>
                            </DropdownItem>
                            <DropdownItem>
                                <PersonAddAltRoundedIcon style={{ marginRight: '5px' }} />
                                <StyledLink to="/register">Sign Up</StyledLink>
                            </DropdownItem>
                        </>
                    )}
                </DropdownContent>
          </Account>
          <StyledLink to="/cart">
          <MenuItem>
         <Badge badgeContent={quantity} color="primary">
          <ShoppingCartOutlined color="white" style={{ fontSize: 30 }} />
          </Badge>
         </MenuItem>
         </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
