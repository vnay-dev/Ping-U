import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoader = () => {
  return (
    <Stack>
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
      <Skeleton height={"1em"} />
    </Stack>
  );
};

export default ChatLoader;
