import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "../ProfileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoader from "./ChatLoader";
import UserListItem from "../UserListItem";

const SideDrawer = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState();
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Search field empty",
        duration: 5000,
        isClosable: true,
        status: "warning",
        position: "top-left",
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
      const { data } = await axios.get(`/users/fetch?search=${search}`, config);
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
    }
  };

  return (
    <>
      <Box
        bg={"white"}
        display="flex"
        justifyContent={"space-between"}
        p={3}
        margin={"0.5em"}
        borderRadius={"5"}
        alignItems="center"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button
            width={"12%"}
            display="flex"
            justifyContent={"space-between"}
            onClick={onOpen}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }}>Search User</Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="Work sans">
          Ping-U
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} marginX={5} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                name={user.name}
                src={user.picture}
                cursor="pointer"
                size={"sm"}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box d="flex">
              <Input
                placeholder="Search by Email or Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button mx={2} onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoader />
            ) : (
              searchResults?.map((item) => {
                return (
                  <UserListItem
                    key={item._id}
                    user={item}
                    //onClick={() => showChatHandler(item._id)}
                  />
                );
              })
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
