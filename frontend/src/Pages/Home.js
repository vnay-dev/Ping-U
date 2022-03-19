import React, { useEffect } from "react";
import {
  Container,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW={"xl"} centerContent>
      <Box
        bg={"white"}
        width="100%"
        p={3}
        textAlign={"center"}
        borderRadius={4}
        margin="1.5em"
      >
        <Text fontFamily={"Work sans"} fontSize={"2xl"}>
          Ping-U
        </Text>
      </Box>
      <Box bg={"white"} borderRadius={4} p={4} width="100%">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
