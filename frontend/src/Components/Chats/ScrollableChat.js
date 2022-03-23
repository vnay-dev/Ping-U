import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../utils/utils";
import { ChatState } from "../../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((item, index) => (
          <div style={{ display: "flex", alignItems:"center" }} key={item._id}>
            {(isSameSender(messages, item, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Tooltip
                label={item.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  m={3}
                  size={"sm"}
                  cursor="pointer"
                  name={item.sender.name}
                  src={item.sender.picture}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  item.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, item, index, user._id),
                marginTop: isSameUser(messages, item, index) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {item.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
