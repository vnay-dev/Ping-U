import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/user/SideDrawer";
import MyChats from "../components/chats/MyChats";
import ChatRoom from "../components/chats/ChatRoom";

const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
 
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        width={"100%"}
        display="flex"
        justifyContent={"space-between"}
        padding={3}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatRoom fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
