import React from "react";
import "./Chats.css";
import Chat from '../../components/Chat/Chat'

const ChatsPage = () => {
  return <div className="chats">
      <Chat
      name="Idan cohen"
      message="Hasta La vista baby" 
      timestamp="6 mins ago" 
      profilePic="./img/idan.jpg"
      />
      <Chat
      name="Eran Yosefia"
      message="Hola Miamor" 
      timestamp="1 hr ago" 
      profilePic="./img/eran.jpg"/>
      <Chat
      name="Ohad"
      message="How You Doin' ?" 
      timestamp="4 hrs ago" 
      profilePic="./img/ohad.jpg"/>
  </div>;
};

export default ChatsPage;
