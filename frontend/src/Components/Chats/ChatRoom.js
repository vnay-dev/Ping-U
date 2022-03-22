import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatRoom = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir={"column"}
      bg="white"
      width={{ base: "100%", md: "68%" }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatRoom;
