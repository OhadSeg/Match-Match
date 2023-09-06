import React, { useEffect, useState, useContext } from "react";
import { UsersContext } from "../../store/usersContext";
import "./Chats.css";
import Chat from '../../components/Chat/Chat'
import instance from "../../rest-utils"

const ChatsPage = () => {

  const [matchedUsers, setMatchedUsers] = useState([])
  const { token, setToken } = useContext(UsersContext) 

  useEffect(() => {
    const token2 = token || window.localStorage.getItem('token')
    setToken(token2)
    instance.get('/users/getAllMatches',{
      headers:
          {"Authorization" : `Bearer ${token2}` }
  }).then((resp) => {
    setMatchedUsers(resp.data)
  })
},[])


  return <div className="chats">
      {matchedUsers.map((user, index) => (
        <Chat
        key = {index}
        email= {user.email}
        name={user.name}
        message="Hasta La vista baby" 
        timestamp="6 mins ago" 
        profilePic={user.myPic}
        />
      ))}
  </div>;
};

export default ChatsPage;
