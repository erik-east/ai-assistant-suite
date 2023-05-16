import {
  ChatCompletionRequestMessageRoleEnum,
  type ChatCompletionRequestMessage,
} from "openai";

interface MessageProps {
  message: ChatCompletionRequestMessage;
}

const Message = ({ message }: MessageProps) => {
  const messageComponent = {
    [ChatCompletionRequestMessageRoleEnum.User]: (
      <UserMessage message={message} />
    ),
    [ChatCompletionRequestMessageRoleEnum.Assistant]: (
      <AssistantMessage message={message} />
    ),
    [ChatCompletionRequestMessageRoleEnum.System]: null,
  };

  return <>{messageComponent[message.role]}</>;
};

const UserMessage = ({ message }: MessageProps) => {
  return (
    <div className="mb-1.5 bg-slate-100 p-1">
      <span className="pr-1 font-bold capitalize">{message.role}:</span>
      <span> {message.content}</span>
    </div>
  );
};

const AssistantMessage = ({ message }: MessageProps) => {
  return (
    <div className="mb-1.5	min-h-30 bg-slate-300 p-1">
      <span className="pr-1 font-bold capitalize">{message.role}:</span>
      <span>{message.content}</span>
    </div>
  );
};

export default Message;
