import { type MouseEvent, useState } from "react";

import { type NextPage } from "next";

import { DropdownWithLabel } from "@/components/common/dropdown-with-label/dropdown-with-label";
import { Hero } from "@/components/common/hero/hero";
import { Button } from "@/components/ui/Button";
import { TextToSummarise } from "@/components/summarise-companion/summary-text-area/summary-text-area";
import { ImageToTextUploader } from "@/components/common/image-to-text-uploader/image-to-text-uploader";
import { Loading } from "@/components/common/loading-animation/loading";
import { Error } from "@/components/common/error/error";
import { GptSummaryResponse } from "@/components/summarise-companion/gpt-summary-response/gpt-summary-response";
import { InputRadioGroup } from "@/components/summarise-companion/input-radio-group/input-radio-group";
import { PageHeader } from "@/components/common/page-header/page-header";

import { useValidateSummaryData } from "@/services/hooks/use-validate-data";

import { api } from "@/utils/api";

import { WORD_COUNT_OPTIONS } from "@/constants/COMPOSE_OPTIONS";
import { ProjectTypeEnums, SummaryInputTypeEnum } from "@/utils/types";

const Home: NextPage = () => {
  const [textToSummarise, setTextToSummarise] = useState<string>("");
  const [wordCount, setWordCount] = useState<string>("");
  const [inputType, setInputType] = useState<SummaryInputTypeEnum>(
    SummaryInputTypeEnum.TEXT
  );
  const [isReadingImage, setIsReadingImage] = useState<boolean>(false);

  const isDataValid = useValidateSummaryData(
    textToSummarise,
    wordCount,
    isReadingImage
  );

  const selectedInputComponent = {
    [SummaryInputTypeEnum.TEXT]: (
      <TextToSummarise
        setTextToSummarise={setTextToSummarise}
        textToSummarise={textToSummarise}
      />
    ),
    [SummaryInputTypeEnum.FILE]: (
      <ImageToTextUploader
        onTextReady={setTextToSummarise}
        setIsReadingImage={setIsReadingImage}
        isReadingImage={isReadingImage}
      />
    ),
  };

  const handleRadioInputChange = (value: SummaryInputTypeEnum) => {
    setTextToSummarise("");
    setInputType(value);
  };

  const {
    data: gptPromptData,
    isFetching,
    error,
    refetch,
  } = api.summariser.prompt.useQuery(
    {
      textToSummarise,
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
      <PageHeader title="EZBrief Companion" />

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

          <div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Hero
                  title="EZBrief Companion"
                  description="EZBrief Companion is a cutting-edge application that employs state-of-the-art natural language processing algorithms to swiftly distill the essence of any text. Whether you're tackling lengthy articles, research papers, or even books, EZBrief Companion offers a seamless solution to extract key information. Say goodbye to time-consuming reading and tedious note-taking. With EZBrief Companion, you can effortlessly obtain concise and comprehensive summaries that capture the essence of the original text. Embrace efficiency and elevate your productivity with EZBrief Companion today."
                />

                <div className="mt-6 flex flex-col items-center justify-center gap-x-6 md:mt-8">
                  <InputRadioGroup
                    inputType={inputType}
                    handleRadioInputChange={handleRadioInputChange}
                  />

                  <div className="flex flex-col space-y-2 py-1 xsm:w-full md:w-1/4">
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

                  {selectedInputComponent[inputType]}

                  <Button
                    disabled={!isDataValid || isFetching}
                    className="mb-6 mt-6 bg-ct-teal-700 xsm:w-full md:w-auto"
                    onClick={(e) => void handleSearch(e)}
                  >
                    Submit
                  </Button>
                </div>

                {isFetching && (
                  <Loading projectType={ProjectTypeEnums.WORDSMITH_COMPANION} />
                )}

                {gptPromptData && (
                  <GptSummaryResponse
                    gptSummaryResponse={gptPromptData.response}
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
