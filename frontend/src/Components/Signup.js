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

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords dont match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        picture: formData.picture,
      };
      const { data } = await axios.post("/auth/signup", signupData, config);
      toast({
        title: "Signup successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      toast({
        title: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const uploadPic = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pic.type === "image/png" || pic.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ping-u");
      data.append("cloud_name", "doj8wxtfa");
      fetch("https://api.cloudinary.com/v1_1/doj8wxtfa/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...formData, picture: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Image format not supported",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
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
