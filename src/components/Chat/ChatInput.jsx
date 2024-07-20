import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";

const ChatInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="flex">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={onTyping}
          placeholder="Write your message"
          className="mr-2 flex-grow rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none animate__animated animate__fadeIn"
        />
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          className="rounded-full bg-purple-600 hover:bg-purple-700 focus:outline-none animate__animated animate__bounceIn"
        >
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;