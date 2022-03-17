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
    } else {
      try {
        let config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        let signupData = {
          email: formData.email,
          password: formData.password,
        };
        const { data } = await axios.post("api/login", signupData, config);
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
          title: "Login failed",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      }
    }
    setLoading(false);
    return;
  };

  return (
    <VStack spacing={"0.8em"}>
      <FormControl>
        <Input
          value={formData.email}
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          value={formData.password}
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <InputRightElement>
          <Button
            size={"sm"}
            margin="0.25em"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Show" : "Hide"}
          </Button>
        </InputRightElement>
      </FormControl>
      <Button
        type="submit"
        variant={"solid"}
        colorScheme={"gray"}
        width="100%"
        isLoading={loading}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button
        type="submit"
        variant={"solid"}
        colorScheme={"red"}
        width="100%"
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
