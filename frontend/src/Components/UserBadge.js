import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadge = ({ user, onClick }) => {
  return (
    <Box onClick={onClick}>
      {user.name}
      <CloseIcon />
    </Box>
  );
};

export default UserBadge;
