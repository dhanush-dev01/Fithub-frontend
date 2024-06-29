import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/UserChatContext";
import { db } from "./firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser, customerType } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSelectGroupChat = () => {
    dispatch({ type: "SET_GROUP_CHAT", payload: { groupId: "global_group_chat", groupName: "Global Group Chat" } });
  };

  return (
    <div className="chats">
      {console.log(customerType)}
      {chats && Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          // Skip rendering the global group chat if the customerType is not 'leader'
          // if (chat[0].startsWith("global_") && customerType !== "leader") {
            
          //   return null;
          // }

          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => chat[0].startsWith("global_") ? handleSelectGroupChat() : handleSelect(chat[1].userInfo)}
            >
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
                }
                alt=""
              />
              <div className="userChatInfo">
                <span>{chat[0].startsWith("global_") ? chat[1].groupName : chat[1].userInfo.displayName || "Unknown User"}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
