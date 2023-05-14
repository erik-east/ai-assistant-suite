import React from "react";
import {
  ChatCompletionRequestMessageRoleEnum,
  type ChatCompletionRequestMessage,
} from "openai";

interface MessageProps {
  message: ChatCompletionRequestMessage;
}

const Message = ({ message }: MessageProps) => {
  return (
    <>
      {message.role === ChatCompletionRequestMessageRoleEnum.User ? (
        <UserMessage message={message} />
      ) : (
        <AssistantMessage message={message} />
      )}
    </>
  );
};

const UserMessage = ({ message }: MessageProps) => {
  return (
    <div className="mb-1.5 flex bg-slate-100">
      <span className="pr-1 font-bold">{message.role}: </span>
      <span>{message.content}</span>
    </div>
  );
};

const AssistantMessage = ({ message }: MessageProps) => {
  return (
    <div className="mb-1.5 flex	min-h-30 bg-slate-300">
      <span className="pr-1 font-bold">{message.role}: </span>
      <span>{message.content}</span>
    </div>
  );
};

export default Message;
