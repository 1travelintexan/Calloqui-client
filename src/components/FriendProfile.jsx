import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import API_URL from "../components/config";
import { useParams } from "react-router-dom";

function FriendProfile() {
  const [friendProfile, setFriendProfile] = useState(null);
  const { friendId } = useParams();

  const handleAddFriend = async (friendId) => {
    const newFriend = await axios.get(`${API_URL}/api/friend/add/${friendId}`, {
      withCredentials: true,
    });
    console.log(newFriend.data);
  };
  useEffect(() => {
    const getFriendProfile = async () => {
      const friendDetail = await axios.get(`${API_URL}/api/friend/${friendId}`);
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
    <div>
      <img src={friendProfile.avatar} alt="friend avatar" />
      <h4>{friendProfile.name}</h4>
      <button
        onClick={() => {
          handleAddFriend(friendProfile._id);
        }}
      >
        Add Friend
      </button>
    </div>
  );
}

export default FriendProfile;
