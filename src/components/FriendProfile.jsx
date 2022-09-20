import { useEffect, useState, useContext } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./config";
import { useParams, useNavigate } from "react-router-dom";
import { AllContext } from "../context/allContext";

function FriendProfile() {
  const [friendProfile, setFriendProfile] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(false);
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { setUser, user } = useContext(AllContext);

  const ColorButton = styled(Button)(() => ({
    backgroundColor: orange[400],
    margin: "20px",
    "&:hover": {
      backgroundColor: orange[600],
    },
  }));

  useEffect(() => {
    const getFriendProfile = async () => {
      const friendDetail = await axios.get(
        `${API_URL.SERVER_URL}/api/friend/${friendId}`
      );
      setFriendProfile(friendDetail.data);
      if (user) {
        let friendArr = user.friends.filter(
          (e) => e._id === friendDetail.data._id
        );
        friendArr.length > 0 ? setCurrentFriend(true) : setCurrentFriend(false);
      }
    };
    getFriendProfile();
  }, [friendId, user]);

  const handleAddFriend = async (friendId) => {
    const userWithNewFriend = await axios.get(
      `${API_URL.SERVER_URL}/api/friend/add/${friendId}`,
      {
        withCredentials: true,
      }
    );
    setUser(userWithNewFriend.data);
    navigate("/friends");
  };

  const handleDeleteFriend = async (friendId) => {
    const friendRemoved = await axios.get(
      `${API_URL.SERVER_URL}/api/friend/remove/${friendId}`,
      {
        withCredentials: true,
      }
    );
    setUser(friendRemoved.data);
    navigate("/friends");
  };

  const handleChat = async (friendId) => {
    let conversationId = await axios.post(
      `${API_URL.SOCKET_URL}/chat/conversation`,
      { participants: [user._id, friendId] },
      { withCredentials: true }
    );
    navigate(`/chat/${conversationId.data._id}`);
  };

  if (!friendProfile || !user) {
    return (
      <div className="loading">
        <Spinner
          animation="grow"
          variant="warning"
          style={{ height: "200px", width: "200px" }}
        />
      </div>
    );
  }

  return (
    <div className="friends-list">
      {friendProfile.avatar ? (
        <img
          src={friendProfile.avatar}
          alt="friend avatar"
          className="friend-profile-image"
        />
      ) : (
        <img
          src="http://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8.jpg"
          alt="friend avatar"
          className="friend-profile-image"
        />
      )}
      <h4>{friendProfile.name}</h4>
      {currentFriend ? (
        <>
          <button
            onClick={() => {
              handleChat(friendProfile._id);
            }}
          >
            Chat
          </button>
          <button
            onClick={() => {
              handleDeleteFriend(friendProfile._id);
            }}
          >
            Remove Friend
          </button>
        </>
      ) : (
        <ColorButton
          variant="contained"
          size="large"
          onClick={() => {
            handleAddFriend(friendProfile._id);
          }}
        >
          Add Friend
        </ColorButton>
      )}
    </div>
  );
}

export default FriendProfile;
