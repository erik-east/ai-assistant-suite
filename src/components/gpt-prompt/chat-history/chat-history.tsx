import Message from "@/components/gpt-prompt/chat-history/message";
import GPTChatLoading from "@/components/common/loading-animation/gpt-chat-loading";

import { type ChatCompletionRequestMessage } from "openai";

interface ChatHistoryProps {
  gptMessages: ChatCompletionRequestMessage[];
  isLoading: boolean;
}

const ChatHistory = ({ gptMessages, isLoading }: ChatHistoryProps) => (
  <div className="flex h-95p w-full flex-col overflow-y-auto rounded border-2	border-solid border-slate-400 p-1	">
    {gptMessages.map((message, index) => (
      <Message key={`${message.role}-${index}`} message={message} />
    ))}
    {isLoading && <GPTChatLoading />}
  </div>
);

export default ChatHistory;
