import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      let config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let loginData = {
        email: formData.email,
        password: formData.password,
      };
      const { data } = await axios.post("/users/login", loginData, config);
      if (data !== undefined) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast({
          title: "Login successful",
          status: "success",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
        navigate("/chats");
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"0.8em"}>
      <FormControl>
        <Input
          value={formData.email}
          type="email"
          placeholder="Email"
          borderColor={"#d6d6d6"}
          _focus={{ boxShadow: "none" }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          value={formData.password}
          borderColor={"#d6d6d6"}
          placeholder="Password"
          _focus={{ boxShadow: "none" }}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <InputRightElement>
          <Button
            size={"sm"}
            margin="0.25em"
            _focus={{ boxShadow: "none" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Show" : "Hide"}
          </Button>
        </InputRightElement>
      </FormControl>
      <Button
        type="submit"
        variant={"solid"}
        _focus={{ boxShadow: "none" }}
        _hover={{ background: "#00c76d" }}
        color="white"
        bg="whatsapp.400"
        width="100%"
        isLoading={loading}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button
        type="submit"
        _focus={{ boxShadow: "none" }}
        variant={"outline"}
        style={{ border: "1px solid #04c970" }}
        width="100%"
        _hover={{ color: "white", background: "#179947" }}
        onClick={() => {
          setFormData({
            ...formData,
            email: process.env.REACT_APP_GUEST_EMAIL,
            password: process.env.REACT_APP_GUEST_PASSWORD,
          });
        }}
      >
        Guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
