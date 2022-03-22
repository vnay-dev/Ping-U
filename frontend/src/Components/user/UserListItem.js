import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, onClick }) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      display="flex"
      padding={2}
      borderRadius="lg"
      alignItems={"center"}
      marginY={"1em"}
      w="100%"
    >
      <Avatar
        src={user.picture}
        name={user.name}
        size="sm"
        cursor={"pointer"}
        marginX={"1em"}
      ></Avatar>
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs"><b>Email : </b>{user.email}</Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
