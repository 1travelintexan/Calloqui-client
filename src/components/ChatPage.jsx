import axios from "axios";
import { API_URL } from "./config";
import io from "socket.io-client";
import { useContext, useState, useEffect } from "react";
import { AllContext } from "../context/allContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";

function ChatPage() {
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  let { chatId } = useParams();
  const { user } = useContext(AllContext);
  let socket = io(`${API_URL.SOCKET_URL}`);

  //mui button
  const ColorButton = styled(Button)(() => ({
    backgroundColor: orange[400],
    margin: "20px",
    "&:hover": {
      backgroundColor: orange[600],
    },
  }));

  useEffect(() => {
    const getMessages = async () => {
      axios
        .get(`${API_URL.SOCKET_URL}/chat/messages/${chatId}`)
        .then((chatRes) => {
          setMessageList(chatRes.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getMessages();
  }, [chatId]);

  //ensure that the user is connected to a specific chat via webSocket
  socket.emit("join_chat", chatId);

  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  const handleMessageInput = (e) => {
    setCurrentMessage(e.target.value);
  };

  const sendMessage = async () => {
    // Create the object structure
    let messageContent = {
      chatId: chatId,
      content: {
        sender: user._id,
        message: currentMessage,
      },
    };

    // emit it so that everyone connected to the same chat receives the message
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setCurrentMessage("");
  };

  if (loading) {
    <p>Loading messages . . .</p>;
  }

  return (
    <div className="chat-container">
      <h2 className="chat-header">Chat</h2>
      <div>
        {messageList &&
          user &&
          messageList.map((message) => {
            console.log(message);
            return (
              <div key={uuidv4()}>
                {message.sender.name === user.name ? (
                  <div className="individual-container-sender">
                    <div className="individual-message-sender">
                      <h5> {message.message}</h5>
                    </div>
                    <h4 className="chat-name"> {message.sender.name}</h4>
                  </div>
                ) : (
                  <div className="individual-container-friend">
                    <h4 className="chat-name"> {message.sender.name}:</h4>
                    <div className="individual-message-friend">
                      <h5> {message.message}</h5>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="input-container">
        <input
          value={currentMessage}
          type="text"
          placeholder="Surf's Up Brah..."
          className="chat-input"
          onChange={handleMessageInput}
        />
        <ColorButton
          variant="contained"
          style={{
            textTransform: "none",
            padding: "20px",
            width: "8rem",
            fontSize: "1.2rem",
          }}
          onClick={sendMessage}
        >
          Send
        </ColorButton>
      </div>
    </div>
  );
}
export default ChatPage;
