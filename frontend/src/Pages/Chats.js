import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/Basic/SideDrawer";
import MyChats from "../Components/Chats/MyChats";
import ChatRoom from "../Components/Chats/ChatRoom";

const Chats = () => {
  const { user } = ChatState();
  const [fecthAgain, setFetchAgain] = useState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        width={"100%"}
        display="flex"
        justifyContent={"space-between"}
        padding={3}
      >
        {user && <MyChats fecthAgain={fecthAgain} />}
        {user && (
          <ChatRoom fecthAgain={fecthAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
