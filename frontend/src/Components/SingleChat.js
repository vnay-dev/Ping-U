import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getFullSenderData, getSender } from "../config/chatConfig";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();

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
            bg="#E8E8E8"
            w="100%"
            h="100%"
            overflowY={"hidden"}
          ></Box>
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
