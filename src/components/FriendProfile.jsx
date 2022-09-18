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
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AllContext);

  const ColorButton = styled(Button)(() => ({
    backgroundColor: orange[400],
    margin: "20px",
    "&:hover": {
      backgroundColor: orange[600],
    },
  }));

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
  useEffect(() => {
    const getFriendProfile = async () => {
      const friendDetail = await axios.get(
        `${API_URL.SERVER_URL}/api/friend/${friendId}`
      );
      setFriendProfile(friendDetail.data);
    };
    getFriendProfile();
  }, [friendId]);
  if (!friendProfile) {
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
      <ColorButton
        variant="contained"
        size="large"
        onClick={() => {
          handleAddFriend(friendProfile._id);
        }}
      >
        Add Friend
      </ColorButton>
    </div>
  );
}

export default FriendProfile;
