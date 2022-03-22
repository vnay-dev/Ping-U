import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/Basic/SideDrawer";
import MyChats from "../Components/Chats/MyChats";
import ChatRoom from "../Components/Chats/ChatRoom";

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
