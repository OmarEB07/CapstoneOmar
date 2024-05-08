import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import BackgroundVideo from "../Assets/animated.mp4"; // Ensure this path is correct
import { useSelector, useDispatch } from "react-redux";
import image from "../Assets/logo1.png";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import { CheckCircleOutline } from "@mui/icons-material";
import {
  removeProductFromCart,
  cartActions,
  clearUserCart,
} from "../Redux/cartRedux"; // Update the import path as necessary
import { saveOrder } from "../Redux/orderRedux"; // Update the import path as necessary

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import LoadingScreen from "../components/LoadingScreen";

const stripePromise = loadStripe(
  "pk_test_51OblF5JdMEsL5yevoUiQJBDgptLXa9klpIVzqLGSxxfErUOWHXuzc8bXxnT8FcqTHYOPwWh5Q7gsaZMdOFkyVVun0031WafG2N"
);

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Place the video behind other content */
  image-rendering: crisp-edges;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
`;

const Product = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to bottom, #1d2d41, #1a1e23);
  border: solid #427e9e;
  border-style: outset;
  padding: 10px;
  margin-bottom: 20px; /* Add space between products */
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 25px;
  transition: background-color 0.3s ease;
  border-radius: 4px;

  &:hover {
    color: white; /* Change color on hover for visual feedback */
    background-color: red;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 2;
  padding: 10px;
`;

const Image = styled.img`
  width: 25%;
`;

const Details = styled.div`
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  padding: 25px;
`;

const ProductName = styled.span`
  color: white;
`;

const ProductCategory = styled.span`
  color: white;
`;

const ProductId = styled.span`
  color: white;
`;

const ProductConsole = styled.div`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  color: white;
`;

const ProductType = styled.span`
  color: white;
`;

const PriceDetail = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  padding: 20px;
`;
const Wrapper = styled.div`
  padding: 20px;
`;

const Top = styled.div`
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const ProductAmount = styled.div`
  margin: 5px;
  font-size: 24px;
  color: white;
`;

const ProductPrice = styled.div`
  font-weight: 200;
  font-size: 30px;
  color: ${({ onSale }) => (onSale ? "red" : "limegreen")};
  text-decoration: ${({ onSale }) => (onSale ? "line-through" : "none")};
  margin-right: ${({ onSale }) => (onSale ? "10px" : "0")};
`;

const SalePrice = styled(ProductPrice)`
  color: limegreen;
  text-decoration: none;
`;

const Hr = styled.hr`
  height: 1px;
  margin-bottom: 20px;
  border: none;
`;

const Summary = styled.div`
  margin-top: 10%;
  margin-left: 10%;
  height: 40vh;
  padding: 20px;
  border-radius: 10px;
  border: 5px solid black;
  flex: 1;
  background-color: white;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  margin-bottom: 25px;
  text-decoration: underline;
  margin-left: 20%;
`;

const SummaryItem = styled.div`
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};

  justify-content: space-between;
  display: flex;
  margin: 30px 0px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  font-weight: 600;
  font: 30px;
  color: white;
  background-color: black;
  padding: 10px;
  width: 100%;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #0b0b45;
    border: solid 1px #0b0b45;
  }
`;

const Button2 = styled.button`
  font-weight: 600;
  font: 30px;
  color: white;
  background-color: green;
  padding: 10px;
  width: 100%;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: green;
    border: solid 1px white;
  }
`;

const Button3 = styled.button`
  font-weight: 600;
  font: 30px;
  color: white;
  background-color: limegreen;
  padding: 10px;
  width: 100%;
  transition: background-color 0.3s ease;
  border: solid 1px limegreen;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: green;
    border: solid 1px white;
  }
`;

const TopButton = styled.button`
  background-color: white;
  color: black;
  border: solid 1px black;

  font-weight: 600;
  padding: 10px;

  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: blue;
    color: white;
    border: solid 1px blue;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #0b0b45;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 20%;
  position: relative;
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: red;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    color: white;
    background-color: red;
  }
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Logo = styled.img`
  display: block;
  max-width: 100px;
  margin: 0 auto 20px;
`;

const SuccessMessage = styled.div`
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
`;

const SuccessTitle = styled.h2`
  margin-top: 0;
  color: limegreen;
`;

const SuccessDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  padding: 10px 0px;
`;

const CheckIcon = styled(CheckCircleOutline)`
  font-size: 40px !important; // Override MUI font size
  color: limegreen;
  margin-bottom: 20px;
`;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "white", // Text color, adjust if needed
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif", // Adjust the font family to match your design
      fontSize: "16px", // Adjust the font size to match your Input component
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4", // Placeholder text color, adjust if needed
      },

      padding: "10px 12px", // Adjust padding to match your Input component
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

//const cart = useSelector((state) => state.cart);

//const user = useSelector((state) => state.user.currentUser);

//const stripe = useStripe();
//const elements = useElements();
//const cart = useSelector((state) => state.cart);
//const [name, setName] = useState("");
//const [email, setEmail] = useState("");
//const navigate = useNavigate(); // Initialize useNavigate
//const Dispatch = useDispatch();
//const user = useSelector((state) => state.user.currentUser);

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate(); // You can remove this if you no longer need to navigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { clientSecret } = await userRequest
      .post("/checkout/payment", {
        amount:
          (
            cart.total +
            cart.total * 0.1 -
            cart.total * 0.05 +
            cart.total * 0.025
          ).toFixed(2) * 100,
      })
      .then((res) => res.data);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name, email },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment successful");
      dispatch(
        saveOrder({
          userId: user._id,
          products: cart.products,
          amount: (
            cart.total +
            cart.total * 0.1 -
            cart.total * 0.05 +
            cart.total * 0.025
          ).toFixed(2),
        })
      ).then(() => {
        dispatch(clearUserCart(user._id));
      });

      setPaymentSuccess(true); // Set payment success state to true
    }
  };

  if (paymentSuccess) {
    return (
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Logo src={image} alt="PixelVault" />
          <SuccessMessage>
            <CheckIcon />
            <SuccessTitle>Payment was successful!</SuccessTitle>
            <SuccessDescription>
              You can review your order at the Order History page by clicking
              the button below.
            </SuccessDescription>
            <Button3 onClick={() => navigate("/order-history")}>
              Go to Order History
            </Button3>
          </SuccessMessage>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Logo src={image} alt="PixelVault" />
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="card-element">Card Details</Label>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </FormField>
          <Button2 type="submit" disabled={!stripe}>
            Pay $
            {(
              cart.total +
              cart.total * 0.1 -
              cart.total * 0.05 +
              cart.total * 0.025
            ).toFixed(2)}
          </Button2>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

const Cart = () => {
  const toggleCheckoutModal = () =>
    setIsCheckoutModalOpen(!isCheckoutModalOpen);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("Cart total is now: ", cart.total); // This will log whenever cart.total changes
  }, [cart.total]);
  const { loading, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeProductFromCart({ userId: user._id, productId }));
  };

  useEffect(() => {
    console.log("Cart page mounted or updated. Current user ID:", user?._id);
    console.log("Current cart state:", cart);
    // If there's specific logic to fetch cart data on mount, ensure it's called here and log it
  }, [user, cart]);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const toggleModal = () => setIsCheckoutModalOpen(!isCheckoutModalOpen);

  return (
    <Container>
      {loading && <LoadingScreen />}
      <VideoBackground autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4" />
      </VideoBackground>
      <Navbar />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton>CONTINUE BROWSING</TopButton>
        </Top>
        <Bottom>
          <Info>
            {/* Assuming cart.products now contains all the detailed info */}
            {cart.products.map((product, index) => (
              <React.Fragment key={product.productId}>
                {" "}
                {/* Use unique key, product ID might not be directly available */}
                <Product>
                  <RemoveButton
                    onClick={() => handleRemoveFromCart(product.productId)}
                  >
                    X
                  </RemoveButton>
                  <ProductDetail>
                    <Image src={product.img || "default_image_path"} />{" "}
                    {/* Adjust image source as needed */}
                    <Details>
                      <ProductId>
                        <b>ID:</b> {product.productId}
                      </ProductId>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductCategory>
                        <b>Category:</b> {product.categories[0]}
                      </ProductCategory>
                      {product.categories[0] == "VideoGames" && (
                        <ProductConsole>
                          <b>Console:</b>
                          {product.console}
                        </ProductConsole>
                      )}
                      <ProductType>
                        <b>Product Type:</b> {product.type}
                      </ProductType>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>
                      $
                      {product.onSale
                        ? product.price *
                          (1 - product.salePercentage).toFixed(2) *
                          product.quantity
                        : product.price * product.quantity}
                    </ProductPrice>
                    <ProductAmount>{product.quantity}</ProductAmount>
                  </PriceDetail>
                </Product>
                {index !== cart.products.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>Delivery Fees</SummaryItemText>
              <SummaryItemPrice>
                $ {(cart.total * 0.025).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Customs Fees</SummaryItemText>
              <SummaryItemPrice>
                $ {(cart.total * 0.1).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>First Time Customer Discount</SummaryItemText>
              <SummaryItemPrice>
                {" "}
                - $ {(cart.total * 0.05).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Sub Total</SummaryItemText>
              <SummaryItemPrice> $ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                ${" "}
                {(
                  cart.total +
                  cart.total * 0.1 -
                  cart.total * 0.05 +
                  cart.total * 0.025
                ).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>

            {/* Additional summary items */}
            <Button onClick={toggleModal}>Proceed to Checkout</Button>
            {isCheckoutModalOpen && (
              <Elements stripe={stripePromise}>
                <CheckoutForm onClose={toggleModal} />
              </Elements>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
