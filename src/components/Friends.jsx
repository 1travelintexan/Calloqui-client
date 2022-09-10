import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AllContext } from "../context/allContext";
import API_URL from "../components/config";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Friends() {
  const [allUsers, setAllUsers] = useState(null);
  const { user } = useContext(AllContext);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await axios.get(`${API_URL}/api/all-users`);
      let filteredUsers = allUsers.data.filter((e) => e._id !== user._id);
      setAllUsers(filteredUsers);
    };
    if (user) {
      getAllUsers();
    }
  }, [user]);

  if (!user) {
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
    <>
      <div>
        <h2>Make some Surf Friends</h2>
      </div>
      <div className="friend-page">
        <div>
          <h4>Friends</h4>
          <h5>{user && user.friends.map((e) => e.name)}</h5>
        </div>
        <div>
          <h4>Possible Friends:</h4>
          {allUsers &&
            allUsers.map((e) => {
              return (
                <div key={e._id}>
                  <Link to={`/friend/${e._id}`}>{e.name}</Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Friends;