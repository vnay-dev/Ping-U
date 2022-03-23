import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getFullSenderData, getSender } from "../../utils/utils";
import { ChatState } from "../../context/ChatProvider";
import GroupChatModal from "../modals/GroupChat";

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

  const getSenderImage = (senders) => {
    return getFullSenderData(user, senders).picture;
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
        p={4}
      >
        Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
            fontWeight="normal"
          >
            Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir={"column"}
        w="100%"
        overflowY={"hidden"}
        bg="#F8F8F8"
      >
        {allChats ? (
          <Stack overflowY={"scroll"}>
            {allChats?.map((item) => {
              return (
                <Box
                  onClick={() => setSelectedChat(item)}
                  cursor="pointer"
                  key={item._id}
                  bg={selectedChat === item ? "#02c268" : "#E8E8E8"}
                  color={selectedChat === item ? "white" : "black"}
                  p={3}
                  display="flex"
                  alignItems={"center"}
                >
                  <Avatar
                    src={getSenderImage(item.users)}
                    name={getSender(loggedUser, item.users)}
                    marginRight={"1em"}
                  />
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
