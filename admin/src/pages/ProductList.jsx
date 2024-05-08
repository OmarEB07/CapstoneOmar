import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/apiCalls";
import Barcode from "react-barcode";
import {
  showSuccessToast,
  showErrorToast,
} from "../components/toastNotifications";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* Adjust the gap as needed */
`;

const ProductListContainer = styled.div`
  margin-bottom: 10px;
  flex: 5;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductListEdit = styled.button`
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

const ProductListDelete = styled(DeleteOutline)`
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

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = async (id) => {
    deleteProduct(id, dispatch);

    const result = await deleteProduct(id, dispatch);
    if (result.success) {
      showSuccessToast("Product deleted successfully!");
    } else {
      showErrorToast("An error occurred.");
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      renderCell: (params) => {
        return <Barcode value={params.value} />;
      },
    },

    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg src={params.row.img} alt="" />
            {params.row.title}
          </ProductListItem>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        // Accessing the first element of categories array or showing "No Category" if it's empty or undefined
        const firstCategory =
          params.row.categories && params.row.categories.length > 0
            ? params.row.categories[0]
            : "No Category";
        return <div>{firstCategory}</div>;
      },
    },

    {
      field: "genre",
      headerName: "Genre",
      width: 200,
      renderCell: (params) => {
        // Accessing the first element of categories array or showing "No Category" if it's empty or undefined
        const genre =
          params.row.categories && params.row.categories.length > 0
            ? params.row.categories[1]
            : "No Category";
        return <div>{genre}</div>;
      },
    },

    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}></Link>
            <ProductListDelete onClick={() => handleDelete(params.row._id)} />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <ProductListContainer>
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </ProductListContainer>
    </Container>
  );
}
