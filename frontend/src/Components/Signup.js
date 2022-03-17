import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { axios } from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const uploadPic = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    } else if (pic.type === "image/png" || pic.type === "image/jpeg") {
      const formInfo = new FormData();
      formInfo.append("file", pic);
      formInfo.append("upload_preset", "ping-u");
      formInfo.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: formInfo,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...formData, pic: data.url });
        });
    } else {
      toast({
        title: "Image type not supported",
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.pic
    ) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    } else if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
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
          name: formData.name,
          email: formData.email,
          password: formData.password,
          pic: formData.pic,
        };
        const { data } = await axios.post("api/signup", signupData, config);
        if (data !== undefined) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          toast({
            title: "Signup successful",
            status: "success",
            duration: 5000,
            position: "bottom",
            isClosable: true,
          });
          navigate("/chats");
        }
      } catch (error) {
        toast({
          title: "Signup failed",
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
          type="name"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
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
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
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
      <FormControl>
        <FormLabel>Upload picture</FormLabel>
        <Input
          type={"file"}
          p={1}
          accept={"image/*"}
          onChange={(e) => uploadPic(e.target.files[0])}
        />
      </FormControl>
      <Button
        type="submit"
        variant={"solid"}
        colorScheme={"gray"}
        width="100%"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
