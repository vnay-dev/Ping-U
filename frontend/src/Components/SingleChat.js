import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { getFullSenderData, getSender } from "../config/chatConfig";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";

const SingleChat = ({ fetchAgain, setFethAgain }) => {
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
              <>{selectedChat.chatName.toUpperCase()}</>
            ) : (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getFullSenderData(user, selectedChat.users)}
                />
              </>
            )}
          </Text>
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
