import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const ChatMessages = ({ messages, onClick, isTyping }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex-grow overflow-y-auto bg-gray-50 p-4">
      <div className="mb-4 flex justify-center" onClick={onClick}>
        <button className="font-semibold text-purple-600 hover:text-purple-800 transition-colors animate__animated animate__pulse animate__infinite">
          Load more
        </button>
      </div>
      {messages.map((message) => (
        <div
          key={message._id}
          className={`mb-4 flex ${
            message.sender._id === user.id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs rounded-lg p-3 animate__animated ${
              message.sender._id === user.id
                ? "bg-purple-600 text-white animate__fadeInRight"
                : "bg-gray-300 text-gray-800 animate__fadeInLeft"
            }`}
          >
            <div className="mb-2 flex items-center">
              <Avatar
                icon={<UserOutlined />}
                className={`mr-2 ${
                  message.sender._id === user.id ? "order-2" : "order-1"
                }`}
              />
              <span className="text-xs font-semibold">
                {message.sender._id === user.id
                  ? "You"
                  : message.sender.firstName}
              </span>
            </div>
            <p className="break-words">{message.message}</p>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-xs rounded-lg bg-gray-200 p-3 animate__animated animate__fadeIn">
            <div className="typing-indicator">
              <span className="animate__animated animate__bounce animate__infinite"></span>
              <span className="animate__animated animate__bounce animate__infinite animate__delay-1s"></span>
              <span className="animate__animated animate__bounce animate__infinite animate__delay-2s"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;