import React from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import NewCompany from "./pages/NewCompany";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import CompanyList from "./pages/CompanyList";
import Company from "./pages/Company";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled components
const AppContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const MainContent = styled.div`
  width: 100%;
`;

function App() {
  const admin = useSelector(
    (state) => state.user.currentUser?.isAdmin ?? false
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            admin ? (
              <>
                <Topbar />
                <AppContainer>
                  <Sidebar />
                  <MainContent>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/users" element={<UserList />} />
                      <Route path="/newCompany" element={<NewCompany />} />
                      <Route path="/companies" element={<CompanyList />} />
                      <Route path="/company/:companyId" element={<Company />} />
                      <Route path="/products" element={<ProductList />} />
                    </Routes>
                  </MainContent>
                </AppContainer>
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
