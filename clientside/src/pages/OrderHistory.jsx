import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../Redux/orderRedux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImg from "../Assets/backg1.png"; // Import your image here
import Barcode from "react-jsbarcode"; // Importing the Barcode component
import LoadingScreen from "../components/LoadingScreen";
// Styled Components
const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh; // Adjust the height as needed
  background: url(${backgroundImg}) no-repeat center center fixed;
  background-size: cover; // Ensure the background covers the entire container
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px); // Adjust based on Navbar and Footer height
`;

const Title = styled.h1`
  color: white;
  font-weight: bolder;
  margin-bottom: 20px;
  justify-content: center;
  display: flex;
  text-shadow: 2px 2px 8px black; // This applies a shadow of black color at 2px right and 2px down from the text with a blur radius of 8px
`;

const OrderItem = styled.div`
  background-color: rgba(29, 45, 65, 0.9);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const OrderDetails = styled.div`
  color: #ffffff;
  flex-grow: 1;
`;

const Detail = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const OrderHistory = () => {
  const { orders, status, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <Container>
        <Title>Order History</Title>
        <Wrapper>
          {orders.map((order) => (
            <OrderItem key={order._id}>
              <OrderDetails>
                <Detail>Total: ${order.amount}</Detail>
                <Detail>
                  Product Titles:{" "}
                  {order.products.map((product) => product.title).join(", ")}
                </Detail>
                <Detail>Order Status: {order.status}</Detail>
              </OrderDetails>
              <Barcode
                value={order._id}
                options={{ format: "CODE128" }}
                renderer="svg"
              />
            </OrderItem>
          ))}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default OrderHistory;
