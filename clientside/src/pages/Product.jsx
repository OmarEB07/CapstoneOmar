import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import ps4 from "../Assets/ps4.png";
import xbox from "../Assets/xbox.png";
import nintendo from "../Assets/nintendo.png";
import Pc from "../Assets/Pc.png";
import BackgroundVideo from "../Assets/animated.mp4";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addProductToCart } from "../Redux/cartRedux";
import playstationlogo from "../Assets/Playstationlogo.png";
import nintendologo from "../Assets/Nintendologo.png";
import xboxlogo from "../Assets/Xboxlogo.png";
import steamlogo from "../Assets/Steamlogo.png";
import LoadingScreen from "../components/LoadingScreen";

const ConsoleLogos = {
  Playstation: playstationlogo,
  Xbox: xboxlogo,
  Nintendo: nintendologo,
  PC: steamlogo,
};
const ConsoleImages = {
  Playstation: ps4,
  Xbox: xbox,
  Nintendo: nintendo,
  PC: Pc,
};

const Cont = styled.div``;

const Container = styled.div`
  position: relative; /* Ensure child elements are positioned relative to this container */
  overflow: hidden; /* Hide overflow content (video) */
`;

const VideoBackground = styled.video`
  position: absolute;

  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Place the video behind other content */
  image-rendering: crisp-edges;
`;

const ConsoleOverlay = styled.img`
  position: relative;
  top: 25px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  object-fit: contain;
  height: auto; // Maintain aspect ratio
  opacity: 0; // Start as hidden
  transition: opacity 0.3s ease-in-out;
  transform: perspective(800px) rotateY(0deg); /* Add perspective and initial rotation */
  transition: transform 0.3s ease-in-out; /* Add a smooth transition effect */
  flex-direction: column;
  display: flex;
`;
const Image = styled.img`
  object-fit: contain;
  position: relative;
  z-index: 1;
  transform: perspective(800px) rotateY(0deg); /* Add perspective and initial rotation */
  transition: transform 0.3s ease-in-out; /* Add a smooth transition effect */
  width: 100%;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  @media (max-width: 768px) {
    ${Image},
    ${ConsoleOverlay} {
      max-width: 50%;
    }
  }

  ${Image},
  ${ConsoleOverlay} {
    max-width: 50%;
  }

  &:hover ${Image} {
    transform: perspective(800px) rotateY(15deg); /* Apply rotation on hover */
  }
  &:hover ${ConsoleOverlay} {
    transform: perspective(800px) rotateY(15deg); /* Apply rotation on hover */
  }
`;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: row;

  @media (max-width: 768px) {
    ${ImgContainer} {
      margin-bottom: 100px;
      align-items: center;
    }
    flex-direction: column;
  }
`;

const Button = styled.button`
  font-weight: 600;
  cursor: pointer;
  background-color: #0b0b45;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: transparent;
    color: #0b0b45;
    border: solid 2px #0b0b45;
  }
`;

const AddToCartButton = styled(Button)`
  margin: 10px 0; // Adjust margin for smaller screens
  align-items: flex-end;
`;

const InfoContainer = styled.div`
  padding: 0px 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 32px;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  font-weight: bolder;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  font-weight: 600;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: 600;
  margin-top: 20px;
  text-decoration: ${({ onSale }) => (onSale ? "line-through" : "none")};
  color: ${({ onSale }) =>
    onSale ? "#ff0000" : "#000"}; // Grey out if on sale
`;

const SalePrice = styled.span`
  font-size: 32px;
  font-weight: 600;
  color: limegreen; // Or any color that indicates a sale
  display: ${({ onSale }) =>
    onSale ? "inline" : "none"}; // Only display when on sale
`;

const FilterContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Filter = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

const FilterTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
  margin-right: 10px;
  font-weight: bolder;
`;

const Tooltip = styled.span`
  position: absolute;
  background-color: ${(props) => consoleColors[props.consoleName]};
  color: white; // You might need to change this for visibility
  border-radius: 4px;
  padding: 5px;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 3;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
`;

const FilterConsole = styled.div`
  cursor: pointer;
  margin: 0px 5px;
  border-radius: 50%;
  height: 40px; // Updated for better visibility of logos
  width: 40px; // Updated for better visibility of logos
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => consoleColors[props.consoleName]};
  background-image: url(${(props) => ConsoleLogos[props.consoleName]});
  background-size: 20px; // Adjust as needed
  background-repeat: no-repeat;
  background-position: center;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: black;
    color: white;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      opacity: 0.8;
      z-index: 1;
    }

    ${Tooltip} {
      opacity: 1;
    }
  }
`;

const FilterPhys = styled.select`
  padding: 5px;
  margin-left: 10px;
  font-size: 20px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #0b0b45;
    color: white;
  }
  outline: none;
`;

const FilterPhysOption = styled.option`
  cursor: pointer;
  background-color: black;
  color: white;
`;

const AddContainer = styled.div`
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;
const Addicon = styled.div`
  cursor: pointer;
`;

const Remicon = styled.div`
  cursor: pointer;
`;
const AmountContainer = styled.div`
  font-weight: 700;
  align-items: center;
  display: flex;
`;

const Amount = styled.span`
  margin: 0px 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  border: 1px solid;
  border-radius: 10px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  background-color: #171791;
  color: white;
  font-weight: bold;
`;

const consoleColors = {
  Playstation: "blue",
  Xbox: "green",
  Nintendo: "red",
  PC: "black",
};

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);

        if (res.data.type && res.data.type.length > 0) {
          setType(res.data.type[0]);
        }

        if (res.data.console && res.data.console.length > 0) {
          setSelectedConsole(res.data.console[0]);
        } else {
          // Handle the case when there is no console array
          setSelectedConsole(null); // or another default value
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    getProduct();
  }, [id]);

  const shouldShowConsoleFilter = () => {
    if (!product.categories || product.categories.length === 0) {
      return false; // No categories array or it's empty, don't show console filter
    }
    const excludedCategories = ["Movies", "FanMerch"];
    return !excludedCategories.includes(product.categories[0]); // Check the first category
  };

  const [selectedConsole, setSelectedConsole] = useState(null);
  const [type, setType] = useState();
  const handleClick = () => {
    //update cart
    // Assuming you have access to the user's ID through your state or context

    const userId = user?._id; // Replace `_id` with the actual property name used in your user state
    const productDetails = {
      productId: product._id,
      quantity,
      title: product.title,
      price: product.price,
      console: selectedConsole,
      type,
      categories: product.categories,
      img: product.img,
      onSale: product.onSale,
      salePercentage: product.salePercentage,
      // Include other details here as needed
    };

    dispatch(addProductToCart({ userId: user._id, productDetails }));
  };

  const consoleOptions = Object.keys(ConsoleImages);

  const handleConsoleChange = (consoleName) => {
    setSelectedConsole(consoleName);
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const calculateSalePrice = (price, salePercentage) => {
    return (price * (1 - salePercentage)).toFixed(2);
  };
  return (
    <Cont>
      <Container>
        <VideoBackground autoPlay loop muted>
          <source src={BackgroundVideo} type="video/mp4" />
        </VideoBackground>

        <Navbar />
        <Wrapper>
          <ImgContainer>
            {selectedConsole && (
              <ConsoleOverlay
                src={ConsoleImages[selectedConsole]}
                style={{ opacity: selectedConsole ? 1 : 0 }} // Only show if a console is selected
              />
            )}
            <Image src={product.img} />
          </ImgContainer>

          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <Price onSale={product.onSale}>${product.price}</Price>
            {product.onSale && (
              <SalePrice onSale={product.onSale}>
                ${calculateSalePrice(product.price, product.salePercentage)}
              </SalePrice>
            )}
            <FilterContainer>
              {shouldShowConsoleFilter() && (
                <Filter>
                  <FilterTitle>Console:</FilterTitle>
                  {product.console &&
                    product.console?.map((consoleName) => (
                      <FilterConsole
                        key={consoleName}
                        consoleName={consoleName}
                        onClick={() => handleConsoleChange(consoleName)}
                        style={{ backgroundColor: consoleColors[consoleName] }}
                      >
                        <Tooltip consoleName={consoleName}>
                          {consoleName}
                        </Tooltip>
                      </FilterConsole>
                    ))}
                </Filter>
              )}
              <Filter>
                <FilterTitle>Product Type:</FilterTitle>
                <FilterPhys
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {product.type?.map((t) => (
                    <FilterPhysOption key={t} value={t}>
                      {t}
                    </FilterPhysOption>
                  ))}
                </FilterPhys>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remicon>
                  <Remove onClick={() => handleQuantity("dec")} />
                </Remicon>
                <Amount>{quantity}</Amount>
                <Addicon>
                  <Add onClick={() => handleQuantity("inc")} />
                </Addicon>
              </AmountContainer>
              <AddToCartButton onClick={handleClick}>
                ADD TO CART
              </AddToCartButton>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </Container>
      <Footer />
    </Cont>
  );
};

export default Product;
