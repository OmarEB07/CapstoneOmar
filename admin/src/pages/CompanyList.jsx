import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompany, getCompanies } from "../redux/apiCalls";
import {
  showSuccessToast,
  showErrorToast,
} from "../components/toastNotifications";

// Reuse Styled Components from ProductList for consistency
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CompanyListContainer = styled.div`
  margin-bottom: 10px;
  flex: 5;
`;

const CompanyListItem = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #1dd67c;
  color: white;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #3bb077;
  }
`;

const CompanyListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const CompanyListDelete = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const AddButton = styled(Link)`
  padding: 8px 16px;
  background-color: #0b0b45;
  color: #fff;
  border-radius: 5px;
  border: 1px solid black;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    background-color: transparent;
    color: black;
    border: 1px solid black;
  }
  width: 10%;
`;

export default function CompanyList() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    dispatch(getCompanies()); // For CompanyList
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteCompany(id, dispatch);
      if (result.success) {
        showSuccessToast("Company deleted successfully!");
      } else {
        showErrorToast("An error occurred.");
      }
    } catch (error) {
      showErrorToast("Network error or unexpected error occurred.");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 250,
      renderCell: (params) => {
        return (
          <CompanyListItem>
            <CompanyListImg src={params.row.logo} alt="" />
            {params.row.companyName}
          </CompanyListItem>
        );
      },
    },

    {
      field: "username",
      headerName: "Username",
      width: 250,
      renderCell: (params) => {
        return <CompanyListItem>{params.row.username}</CompanyListItem>;
      },
    },

    { field: "email", headerName: "Email", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/company/${params.row._id}`}>
              <CompanyListEdit>Edit</CompanyListEdit>
            </Link>
            <CompanyListDelete onClick={() => handleDelete(params.row._id)} />
          </>
        );
      },
    },
  ];
  console.log(companies); // Check what's in the companies array

  return (
    <Container>
      <CompanyListContainer>
        <DataGrid
          rows={companies || []} // Provide a default empty array if companies is undefined
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </CompanyListContainer>
      <AddButton to="/newcompany">Create New</AddButton>
    </Container>
  );
}
