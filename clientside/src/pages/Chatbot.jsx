import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cloud from "../Assets/cloud.jpg";

const Cont = styled.div`
  background: url(${cloud}) no-repeat center center;
  background-size: cover;
`;

const sendMessageAPI = async (message) => {
  const res = await axios.post("http://localhost:4000/api/chatbot/ask", {
    message,
  });
  return res.data;
};

// Enhanced Styled components
const Header = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #11116b;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  margin-top: 10px;
  color: white;
  text-shadow: 2px 2px 8px black; // This applies a shadow of black color at 2px right and 2px down from the text with a blur radius of 8px

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 20px auto;
  border: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    max-width: 90%;
    margin: 10px auto;
  }
`;
const Conversation = styled.div`
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  overflow-x: hidden; // Prevent horizontal scrolling
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.role === "user" ? "#5C67F2" : "#e4e6eb"};
  color: ${(props) => (props.role === "user" ? "white" : "#333")};
  align-self: ${(props) => (props.role === "user" ? "flex-end" : "flex-start")};
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 100%; // Adjusted from 90% to 100% for better use of space on small screens

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const InputMessage = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-right: 10px;
  outline: none;
  background-color: #48487f;
  color: white;
  transition: all 0.3s;

  &:focus {
    background-color: white;
    color: black;
  }

  &::placeholder {
    color: white;
  }

  @media (max-width: 768px) {
    padding: 8px;
    margin-right: 5px;
  }
`;
const SendButton = styled.button`
  background-color: #0b0b45;
  color: white;
  border: 2px solid #0b0b45;
  padding: 10px 15px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
  transition: background-color 0.4s;

  &:hover {
    background-color: transparent; // Slightly darker on hover
    color: black;
    border-color: white;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const IconSpin = styled(DoubleArrowOutlinedIcon)`
  animation: ${spin} 2s linear infinite;
`;

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
    },
  ]);

  const mutation = useMutation({
    mutationFn: sendMessageAPI,
    onSuccess: (data) => {
      setIsAITyping(false);
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: data.message },
      ]);
    },
  });

  const handleSendMessage = () => {
    const currentMessage = message.trim();
    if (!currentMessage) {
      alert("Please enter a message.");
      return;
    }

    setConversation((prevConversation) => [
      ...prevConversation,
      { role: "user", content: currentMessage },
    ]);

    setIsAITyping(true);
    mutation.mutate(currentMessage);
    setMessage("");
  };

  return (
    <>
      <Cont>
        <Navbar />
        <Header>
          <Title>AI Chatbot</Title>
          <Description>
            Enter your message in the input field below to chat with the AI.
          </Description>
        </Header>
        <ChatContainer>
          <Conversation>
            {conversation.map((entry, index) => (
              <Message key={index} role={entry.role}>
                <strong>
                  {entry.role === "user" ? "You: " : <DiamondRoundedIcon />}
                </strong>
                {entry.content}
              </Message>
            ))}
            {isAITyping && (
              <Message role="assistant">
                <DiamondRoundedIcon />
                <strong>AI is typing...</strong>
              </Message>
            )}
          </Conversation>
          <InputArea>
            <InputMessage
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <IconSpin className="icon-spin" />
              ) : (
                <DoubleArrowOutlinedIcon />
              )}
            </SendButton>
          </InputArea>
        </ChatContainer>
        <Footer />
      </Cont>
    </>
  );
};

export default Chatbot;
