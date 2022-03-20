import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
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
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import UserListItem from "./UserListItem";
import UserBadge from "./UserBadge";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toast = useToast();
  const { user, allChats, setAllChats } = ChatState();

  const handleSearch = async (query) => {
    if (!query) {
      toast({
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        title: "Search field empty",
      });
      return;
    } else {
      setSearchQuery(query);
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/users/fetch?search=${query}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      toast({
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        title: "Faild to load search results",
      });
    }
  };

  const addMember = (member) => {
    if (selectedUsers?.includes(member)) {
      toast({
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        title: "Member already present",
      });
      return;
    } else {
      setSelectedUsers([...selectedUsers, member]);
    }
  };

  const handleDelete = (member) => {
    setSelectedUsers(
      selectedUsers.filter((item) => {
        return item._id !== member._id;
      })
    );
  };

  const handleSubmit = async () => {
    if (!groupName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        status: "warning",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/chats/group",
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((item) => item._id)),
        },
        config
      );
      setAllChats([data, ...allChats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to create group chat",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            d="flex"
            justifyContent={"center"}
            fontFamily="Work sans"
            fontSize={"2xl"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir={"column"} alignItems="center">
            <FormControl>
              <Input
                placeholder="Enter group name"
                type={"text"}
                onChange={(e) => setGroupName(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add memebers"
                type={"text"}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box d="flex" width={"100%"} flexWrap="wrap">
              {selectedUsers?.map((item) => {
                return (
                  <UserBadge
                    key={item._id}
                    user={item}
                    onClick={() => handleDelete(item)}
                  />
                );
              })}
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              searchResults?.slice(0, 4).map((item) => {
                return (
                  <UserListItem
                    key={item._id}
                    user={item}
                    onClick={() => addMember(item)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
