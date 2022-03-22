import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserBadge from "../user/UserBadge";
import UserListItem from "../user/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState();

  const [renameLoading, setRenameLoading] = useState(false);

  const handleRemove = async (member) => {
    if (selectedChat.groupAdmin._id !== user._id && member._id !== user._id) {
      toast({
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        title: "Non admins cannot remove members",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chats/group/remove",
        {
          chatId: selectedChat._id,
          userId: member._id,
        },
        config
      );
      user._id === member._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages()
      setLoading(false);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleAddUser = async (member) => {
    if (selectedChat.users.find((item) => item._id === member._id)) {
      toast({
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        title: "Member already present",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Non admins cannot add members",
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chats/group/add",
        {
          chatId: selectedChat._id,
          userId: member._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleRename = async () => {
    if (!groupName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chats/group/rename",
        {
          chatId: selectedChat._id,
          chatName: groupName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        status: "error",
        title: error,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupName("");
  };

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/users/fetch?search=${query}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load search results",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton icon={<ViewIcon />} onClick={onOpen}>
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} d="flex" flex={"wrap"}>
              {selectedChat.users.map((item) => {
                return (
                  <UserBadge
                    key={item._id}
                    user={item}
                    onClick={() => handleRemove(item)}
                  />
                );
              })}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat name"
                value={groupName || ""}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button isLoading={renameLoading} onClick={handleRename}>
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add user to group"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner />
            ) : (
              searchResults.slice(0, 4)?.map((item) => {
                return (
                  <UserListItem
                    key={item._id}
                    user={item}
                    onClick={() => handleAddUser(item)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleRemove(user)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
