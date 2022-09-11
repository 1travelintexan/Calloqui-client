import React, { useEffect, useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import API_URL from "../components/config";
import { useParams, useNavigate } from "react-router-dom";
import { AllContext } from "../context/allContext";

function FriendProfile() {
  const [friendProfile, setFriendProfile] = useState(null);
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AllContext);

  const handleAddFriend = async (friendId) => {
    const userWithNewFriend = await axios.get(
      `${API_URL}/api/friend/add/${friendId}`,
      {
        withCredentials: true,
      }
    );
    setUser(userWithNewFriend.data);
    navigate("/friends");
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
