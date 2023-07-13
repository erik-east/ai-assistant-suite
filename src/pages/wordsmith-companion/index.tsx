import { type MouseEvent, useState } from "react";

import { type NextPage } from "next";

import { DropdownWithLabel } from "@/components/common/dropdown-with-label/dropdown-with-label";
import { Button } from "../../components/ui/Button";
import { Hero } from "@/components/common/hero/hero";
import { Error } from "@/components/common/error/error";
import { GptWordsmithResponse } from "@/components/wordsmith-companion/gpt-wordsmith-response/gpt-wordsmith-response";
import { TextareaWithLabel } from "@/components/gpt-response/text-area-with-label";
import { Loading } from "@/components/common/loading-animation/loading";
import { ProjectTypeEnums } from "@/utils/types";
import { PageHeader } from "@/components/common/page-header/page-header";

import { useValidateWordsmithData } from "@/services/hooks/use-validate-data";
import { api } from "@/utils/api";

import {
  PROFICIENCY_OPTIONS,
  WORD_COUNT_OPTIONS,
} from "@/constants/COMPOSE_OPTIONS";

const Home: NextPage = () => {
  const [proficiency, setProficiency] = useState<string>("");
  const [wordCount, setWordCount] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const isDataValid = useValidateWordsmithData(topic, proficiency, wordCount);

  const {
    data: gptPromptData,
    isFetching,
    error,
    refetch,
  } = api.wordsmith.prompt.useQuery(
    {
      topic,
      proficiency,
      wordCount,
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await refetch();
  };

  return (
    <>
      <PageHeader title="Wordsmith Companion" />

      <main className="isolate">
        <div className="relative pt-6 md:pt-14">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            />
          </svg>

          <div className="py-12 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Hero
                  title="Wordsmith Companion"
                  description="Wordsmith Companion harnesses the power of ChatGPT, an advanced language model, to assist users in generating high-quality essays on various topics. With Wordsmith Companion, users can effortlessly compose well-structured and engaging articles tailored to their specific needs."
                />

                <div className="mt-6 flex flex-col items-center justify-center gap-x-6 md:mt-8">
                  <div className="m-3 w-full">
                    <TextareaWithLabel
                      labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
                      id="essay-topic"
                      label="Essay Topic"
                      placeholder="Type your essay topic here"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div className="container flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row md:gap-16">
                    <div className="flex w-full flex-col space-y-2">
                      <DropdownWithLabel
                        id="proficiency-level"
                        dropdownClassName="xsm:w-full"
                        label="Proficiency Level"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
                        onSelect={setProficiency}
                        options={PROFICIENCY_OPTIONS}
                        selectedValue={proficiency || undefined}
                        placeholder="Select proficiency level"
                      />
                    </div>

                    <div className="flex w-full flex-col space-y-2 py-1">
                      <DropdownWithLabel
                        id="word-count"
                        dropdownClassName="xsm:w-full"
                        label="Word Count"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
                        onSelect={setWordCount}
                        options={WORD_COUNT_OPTIONS}
                        selectedValue={wordCount || undefined}
                        placeholder="Select word count"
                      />
                    </div>
                  </div>

                  <Button
                    disabled={!isDataValid || isFetching}
                    className="mt-6 bg-ct-teal-700 xsm:w-full md:w-auto"
                    onClick={(e) => void handleSearch(e)}
                  >
                    Compose!
                  </Button>
                </div>

                {isFetching && (
                  <Loading projectType={ProjectTypeEnums.WORDSMITH_COMPANION} />
                )}

                {gptPromptData && (
                  <GptWordsmithResponse
                    gptWordsmithResponse={gptPromptData.response}
                  />
                )}

                {error && (
                  <Error
                    httpStatus={error?.data?.httpStatus}
                    message={error?.message}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
