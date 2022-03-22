import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender } from "../../config/chatConfig";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoader from "../Basic/ChatLoader";
import GroupChatModal from "../GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, allChats, setAllChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/chats/fetch", config);
      setAllChats(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to fetch chats from my chats",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      bg="white"
      width={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      borderWidth={"1px"}
    >
      <Box
        fontSize={{ base: "12px", md: "25px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        alignItems={"center"}
        justifyContent="space-around"
        p={2}
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "14px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir={"column"}
        w="100%"
        overflowY={"hidden"}
        bg="#F8F8F8"
        borderRadius="lg"
      >
        {allChats ? (
          <Stack overflowY={"scroll"}>
            {allChats?.map((item) => {
              return (
                <Box
                  onClick={() => setSelectedChat(item)}
                  cursor="pointer"
                  key={item._id}
                  bg={selectedChat === item ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === item ? "white" : "black"}
                >
                  <Text>
                    {!item.isGroupChat
                      ? getSender(loggedUser, item.users)
                      : item.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Text
            fontFamily={"Work sans"}
            d="flex"
            justifyContent={"space-around"}
            alignItems="flex-start"
          >
            Chat list is empty!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
