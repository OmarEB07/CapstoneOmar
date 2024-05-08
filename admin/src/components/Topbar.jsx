import React from "react";
import styled from "styled-components";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import ImageLogo from "./Assets/logo.png";

// Adjusted Styled Components for Topbar
const TopbarContainer = styled.div`
  width: auto;
  background-color: black;
  position: sticky;
  z-index: 999;
`;

const Logo = styled.div`
  height: auto; // Ensure the logo container matches the top bar's height
  display: flex;
  align-items: center; // Center the logo vertically within the Topbar

  & > img {
    width: 15%; // Maintain aspect ratio
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
  return (
    <TopbarContainer>
      <TopbarWrapper>
        <TopLeft>
          <Logo>
            <img src={ImageLogo} alt="Logo" />
          </Logo>
        </TopLeft>
        <TopRight>Admin Page</TopRight>
      </TopbarWrapper>
    </TopbarContainer>
  );
}
