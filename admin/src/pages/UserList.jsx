import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Adjust this import path to where your apiCalls.js is located relative to this file
import { getUsers, deleteUser as deleteUserAction } from "../redux/apiCalls";

// Styled components
const UserListContainer = styled.div`
  flex: 4;
`;

const AddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserListDelete = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); // Adjust based on your state structure

  useEffect(() => {
    dispatch(getUsers()); // Note: getUsers is called without dispatch as a parameter
  }, [dispatch]);

  const handleDelete = (id) => {
    // Assuming deleteUserAction correctly dispatches Redux actions
    deleteUserAction(id, dispatch);
    // Optionally, handle success or error feedback here
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 }, // Ensure this matches your data structure
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt="" />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <UserListDelete
              onClick={() =>
                handleDelete(
                  params.row._id /* Ensure this matches your data structure */
                )
              }
            />
          </>
        );
      },
    },
  ];

  if (!Array.isArray(users)) {
    return <div>Loading users...</div>;
  }

  return (
    <UserListContainer>
      <DataGrid
        rows={users} // Now using users from Redux state
        getRowId={(row) => row._id} // Adjust according to your data's unique identifier
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </UserListContainer>
  );
}
