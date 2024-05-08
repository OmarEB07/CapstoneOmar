import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { sliderItems } from "../data";
import { useState, useEffect } from "react";
import { keyframes } from "styled-components";


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const interpolateColor = (color1, color2, factor = 0.5) => {
  let result = "#";
  for (let i = 0; i < 3; i++) {
    let val1 = parseInt(color1.substr(1 + 2 * i, 2), 16);
    let val2 = parseInt(color2.substr(1 + 2 * i, 2), 16);
    let val = Math.round(val1 + (val2 - val1) * factor).toString(16);
    while (val.length < 2) { val = "0" + val; }
    result += val;
  }
  return result;
};

const Title = styled.h1`
  font-size: 70px;
  letter-spacing: 3px;
  object-fit: contain;
  font-family: 'VT323', monospace;
  
  @media (max-width: 768px) {
    font-size: 40px; // Smaller font size for smaller screens
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;


const GradientText = styled.span`
  background: linear-gradient(to left, ${props => props.gradientColors.color1}, ${props => props.gradientColors.color2}, ${props => props.gradientColors.color3});
  background-size: 200% 200%;
  -webkit-background-clip: text; 
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'VT323', monospace;
  animation: ${gradientAnimation} 5s ease-in infinite;
`;


const Desc = styled.p`
  letter-spacing: 3px;
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;

 
  @media (max-width: 768px) {
    font-size: 16px; // Even smaller font size for small screens
    margin: 20px 100px;
  }
 
`;

const Button = styled.button`
  cursor: pointer;
  background: linear-gradient(to right, #283d57 50%, white 0%);
  border: 3px solid black;
  background-size: 200%;
  background-position: 100% 0;
  box-shadow: 0.4rem 0.4rem 0 black;
  transition: all 0.3s;
  font-size: 20px;
  padding: 10px;
  font-weight: 500;

  &:hover {
    border: solid;
    color: white;
    box-shadow: none;
    background-position: 0.0;
    transform: translate(0.4rem , 0.4rem);
    
  }

  @media (max-width: 768px) {
    padding: 5px 10px; // Smaller padding for smaller screens
  }
`;

const Image = styled.img`
  height: 80%;
  max-width: 100%;
  object-fit: contain;
  position: absolute;
  image-rendering: crisp-edges;
  
  @media (max-width: 768px) {
    position: relative;
    max-width: 80vw;
  }

  @media (max-width: 480px) {
    position: relative;
    max-width: 80vw;
  }
`;

const Slide = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  display: flex;
  background-color: #${(props) => props.bg};
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column; // Stack elements vertically on smaller screens
    justify-content: center; // Center vertically
  }


  @media (max-width: 480px) {
    flex-direction: column; // Stack elements vertically on smaller screens
    justify-content: center; // Center vertically
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;
const InfoContainer = styled.div`
  padding: 50px;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 20px; // Less padding on smaller screens
    text-align: center; // Center text for smaller screens
  }

  @media (max-width: 480px) {
    padding: 10px; // Less padding on smaller screens
    text-align: center; // Center text for smaller screens
  }

  
`;
const Wrapper = styled.div`
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  display: flex;
  height: 100%;
`;

const Arrow = styled.div`
  opacity: 0.5;
  cursor: pointer;
  left: ${(props) => (props.direction === "left" ? "10px" : "")};
  right: ${(props) => (props.direction === "right" ? "10px" : "")};
  margin: auto;
  bottom: 0;
  top: 0;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 50px;
  height: 50px;
  display: flex;
  background-color: lightblue;
  border-radius: 50%;
  z-index: 2;

  &:hover {
    background-color: white;
    transition: background-color 0.3s ease-in-out;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-x: hidden;
`;

const Circle = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(to left, ${props => props.gradientColors.color1}, ${props => props.gradientColors.color2}, ${props => props.gradientColors.color3});

  background-size: 200% 200%;
  top: 35%;
  left: 40%;
  transform: translate(-50%, -50%);
  animation: ${gradientAnimation} 10s ease-in infinite;

  @media (max-width: 768px) {
    width: 300px; // Smaller circle for smaller screens
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // Center circle
  }


`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);


  const [gradientColors, setGradientColors] = useState({
    color1: getRandomColor(),
    color2: getRandomColor(),
    color3: getRandomColor()
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientColors({
        color1: interpolateColor(gradientColors.color1, getRandomColor()),
        color2: interpolateColor(gradientColors.color2, getRandomColor()),
        color3: interpolateColor(gradientColors.color3, getRandomColor())

      });
    }, 15000); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [gradientColors]);



  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
            <Circle gradientColors={gradientColors} />

              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>
              <GradientText gradientColors={gradientColors}>{item.title}</GradientText> Sale
                </Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;