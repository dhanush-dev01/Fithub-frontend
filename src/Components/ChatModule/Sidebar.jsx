import React, { useContext } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { ChatContext } from "../context/UserChatContext";

const Sidebar = () => {
  const { dispatch } = useContext(ChatContext);

  const handleSelectGroupChat = () => {
    dispatch({ type: "SET_GROUP_CHAT", payload: { groupId: "global_group_chat", groupName: "Global Group Chat" } });
  };

  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
