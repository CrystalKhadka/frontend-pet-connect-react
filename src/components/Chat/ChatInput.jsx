import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
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
          placeholder="Write your message"
          className="mr-2 flex-grow"
        />
        <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;