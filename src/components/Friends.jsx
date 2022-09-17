import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AllContext } from "../context/allContext";
import API_URL from "../components/config";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Friends() {
  const [notFriendUsers, setNotFriendUsers] = useState(null);
  const { user } = useContext(AllContext);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsersDB = await axios.get(`${API_URL}/api/all-users`);
      if (user) {
        let allUsers = allUsersDB.data.filter((e) => e._id !== user._id);
        let friendsIds = user.friends.map((e) => e._id);
        let notFriends = allUsers.filter((e) => {
          return !friendsIds.includes(e._id);
        });

        setNotFriendUsers(notFriends);
      }
    };

    getAllUsers();
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
        <h1 className="upcoming-events">Make some Surf Friends!</h1>
      </div>
      <div className="friend-page">
        <div>
          <h4>Your Friends:</h4>
          {user.friends &&
            user.friends.map((e) => {
              return (
                <div key={uuidv4()}>
                  <Link
                    to={`/friend/${e._id}`}
                    className=" friends-list friend-link"
                  >
                    {e.avatar ? (
                      <img
                        src={e.avatar}
                        alt="friend avatar"
                        className="friend-image"
                      />
                    ) : (
                      <img
                        src="http://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8.jpg"
                        alt="profile avatar"
                        className="friend-image"
                      />
                    )}

                    {e.name}
                  </Link>
                </div>
              );
            })}
        </div>
        <div>
          <h4>Future Friends:</h4>
          {notFriendUsers &&
            notFriendUsers.map((e) => {
              return (
                <div key={uuidv4()}>
                  <Link
                    to={`/friend/${e._id}`}
                    className="friends-list friend-link"
                  >
                    {e.avatar ? (
                      <img
                        src={e.avatar}
                        alt="friend avatar"
                        className="friend-image"
                      />
                    ) : (
                      <img
                        src="http://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8.jpg"
                        alt="profile avatar"
                        className="friend-image"
                      />
                    )}
                    {e.name}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Friends;
