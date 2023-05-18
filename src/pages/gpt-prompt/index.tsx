import { type NextPage } from "next";

import GptPrompter from "@/components/gpt-prompt/gpt-prompter";

interface Props {
  openAIApiKey: string;
}

const Index: NextPage<Props> = ({ openAIApiKey }) => (
  <>
    <GptPrompter openAIApiKey={openAIApiKey} />
  </>
);

export function getStaticProps() {
  return {
    props: {
      openAIApiKey: process.env.OPENAI_API_KEY,
    },
  };
}

export default Index;
