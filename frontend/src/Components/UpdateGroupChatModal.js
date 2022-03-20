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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UserBadge from "./UserBadge";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat } = ChatState();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState();

  const [renameLoading, setRenameLoading] = useState(false);

  const handleRemove = () => {};
  const handleRename = () => {};
  const handleSearch = () => {};

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
                  <UserBadge user={item} onClick={() => handleRemove(item)} />
                );
              })}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat name"
                value={groupName}
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
