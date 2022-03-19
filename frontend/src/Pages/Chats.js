import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/Basic/SideDrawer";
import MyChats from "../Components/Chats/MyChats";
import ChatRoom from "../Components/Chats/ChatRoom";

const Chats = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box width={"100%"} display="flex" justifyContent={"space-around"} padding={3}>
        {user && <MyChats />}
        {user && <ChatRoom />}
      </Box>
    </div>
  );
};

export default Chats;
