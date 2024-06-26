import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/UserChatContext";
import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "./firebase";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [userData, setUserData] = useState({})

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    const handleSearch = async () => {
      const q = query(collection(db, "users"), where("uid", "==", message.senderId));
      try {
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (err) {
        console.log(err);
      }
    };
    return () => {
      handleSearch();
    };
  },[]);
  

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
           "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
          }
          alt=""
        />
        <span>
          {/* {console.log("Group message",message)} */}
          {data.groupId === "global_group_chat" ? userData.displayName : "Just now"}
        </span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
