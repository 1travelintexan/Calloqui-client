import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import API_URL from "../components/config";
import { useParams } from "react-router-dom";

function FriendProfile() {
  const [friendProfile, setFriendProfile] = useState(null);
  const { friendId } = useParams();
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
      <h4>{friendProfile.name}</h4>
    </div>
  );
}

export default FriendProfile;
