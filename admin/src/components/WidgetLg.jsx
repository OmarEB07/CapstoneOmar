import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { format } from "timeago.js";

// Styled Components
const WidgetLgContainer = styled.div`
  flex: 2;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const WidgetLgTh = styled.th`
  text-align: left;
`;

const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const WidgetLgDate = styled.td`
  font-weight: 300;
`;

const WidgetLgAmount = styled(WidgetLgDate)``;

const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: ${({ type }) =>
    type === "approved"
      ? "#e5faf2"
      : type === "declined"
      ? "#fff0f1"
      : "#ebf1fe"};
  color: ${({ type }) =>
    type === "approved"
      ? "#3bb077"
      : type === "declined"
      ? "#d95087"
      : "#2a7ade"};
`;

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  return (
    <WidgetLgContainer>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <thead>
          <tr>
            <WidgetLgTh>Customer</WidgetLgTh>
            <WidgetLgTh>Date</WidgetLgTh>
            <WidgetLgTh>Amount</WidgetLgTh>
            <WidgetLgTh>Status</WidgetLgTh>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <WidgetLgUser>
                <span>{order.userId}</span>
              </WidgetLgUser>
              <WidgetLgDate>{format(order.createdAt)}</WidgetLgDate>
              <WidgetLgAmount>${order.amount}</WidgetLgAmount>
              <td>
                <WidgetLgButton type={order.status}>
                  {order.status}
                </WidgetLgButton>
              </td>
            </tr>
          ))}
        </tbody>
      </WidgetLgTable>
    </WidgetLgContainer>
  );
}
