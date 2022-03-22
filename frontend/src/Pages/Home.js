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
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
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
      <Text
        fontFamily={"Work sans"}
        fontSize={"4xl"}
        color={"#515365"}
        fontWeight={500}
        marginY={"0.8em"}
      >
        Ping-U
      </Text>
      <Box bg={"transparent"} borderRadius={"1em"} width="100%">
        <Tabs variant="line" colorScheme="whatsapp">
          <TabList mb="2em">
            <Tab width={"50%"} style={{ boxShadow: "none" }}>
              Login
            </Tab>
            <Tab width={"50%"} style={{ boxShadow: "none" }}>
              Signup
            </Tab>
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
