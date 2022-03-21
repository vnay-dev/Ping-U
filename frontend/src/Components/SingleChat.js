import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getFullSenderData, getSender } from "../config/chatConfig";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/messages",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
          title: "Failed to send message",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            w="100%"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            ) : (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getFullSenderData(user, selectedChat.users)}
                />
              </>
            )}
          </Text>
          <Box
            d="flex"
            justifyContent={"flex-end"}
            alignItems="flex-end"
            bg="#E8E8E8"
            w="100%"
            h="100%"
            overflowY={"hidden"}
          >
            {loading ? <Spinner /> : <div></div>}
            <FormControl onKeyDown={sendMessage} isRequired mb={1}>
              <Input
                value={newMessage}
                placeholder="Enter a message"
                onChange={typingHandler}
                bg="white"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems={"center"} justifyContent="center" h="100%">
          <Text fontFamily={"Work sans"}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
