import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import ImageLogo from "../Assets/logo.png"; // Default logo
import { logout } from "../redux/companyRedux"; // Import the logout action you need to create
import { useNavigate } from "react-router-dom"; // Import if navigation after logout is needed

// Styled components definition remains the same
const TopbarContainer = styled.div`
  width: auto;
  background-color: black;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Logo = styled.div`
  height: auto;
  display: flex;
  align-items: center;

  & > img {
    width: 100px;
  }
`;

const TopbarWrapper = styled.div`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopLeft = styled.div``;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  font-weight: bolder;
  font-size: 20px;
`;

export default function Topbar() {
  const currentCompany = useSelector((state) => state.company.currentCompany);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    // Optionally clear other persisted data or reset entire state if needed
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <TopbarContainer>
      <TopbarWrapper>
        <TopLeft>
          <Logo>
            <img src={currentCompany?.logo || ImageLogo} alt="Logo" />
          </Logo>
        </TopLeft>
        <TopRight>
          {currentCompany?.companyName || "Company Page"}
          <ExitToApp style={{ marginLeft: "20px" }} onClick={handleLogout} />
        </TopRight>
      </TopbarWrapper>
    </TopbarContainer>
  );
}
