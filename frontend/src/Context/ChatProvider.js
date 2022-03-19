import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  // to make the states available to other parts of the app
  return useContext(ChatContext);
};

export default ChatProvider;
