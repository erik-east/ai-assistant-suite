import { type MouseEvent, useState } from "react";

import { type NextPage } from "next";

import { DropdownWithLabel } from "@/components/common/dropdown-with-label/dropdown-with-label";
import { Button } from "../../components/ui/Button";
import { Hero } from "@/components/common/hero/hero";
import { Error } from "@/components/common/error/error";
import { GptResponse } from "@/components/gpt-response/gpt-response";
import { TextareaWithLabel } from "@/components/common/text-area-with-label/text-area-with-label";
import { Loading } from "@/components/common/loading-animation/loading";
import { ProjectTypeEnums } from "@/utils/types";
import { PageHeader } from "@/components/common/page-header/page-header";

import { useValidateData } from "@/services/hooks/use-validate-data";
import { api } from "@/utils/api";

import {
  RELATIONSHIP_OPTIONS,
  TONE_OPTIONS,
  OCCASION_OPTIONS,
  CLOSENESS_LEVEL_OPTIONS,
} from "@/constants/GREETING_CARD_OPTIONS";

const Home: NextPage = () => {
  const [recipientName, setRecipientName] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [tone, setTone] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");
  const [closeness, setCloseness] = useState<string>("");

  const isDataValid = useValidateData([
    recipientName,
    senderName,
    relationship,
    tone,
    occasion,
    closeness,
  ]);

  const {
    data: gptPromptData,
    isFetching,
    error,
    refetch,
  } = api.greetify.prompt.useQuery(
    {
      recipientName,
      senderName,
      relationship,
      tone,
      occasion,
      closeness,
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
      <PageHeader title="Greetify Companion" />

      <main className="isolate">
        <div className="relative pt-6 md:pt-12">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="py-8 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Hero
                  title="Greetify Companion"
                  description="Say goodbye to generic cards and hello to heartfelt expressions tailored to the occasion, recipient, and desired tone. Whether it's a birthday, graduation, or any special event, Greetify Companion crafts the perfect card every time. With Greetify Companion, customization is key. Just provide a few details about the recipient, your relationship, and the desired tone, and our cutting-edge AI algorithm will work its magic. Spread joy and love with tailor-made greeting cards that truly speak from the heart."
                />

                <div className="mt-6 flex flex-col items-center justify-center gap-x-6 md:mt-8">
                  <div className="m-3 w-full">
                    <TextareaWithLabel
                      labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-purple-600 xsm:text-sm"
                      id="recipient-name"
                      label="Recipient Name"
                      placeholder="Type the name of the recipient"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>

                  <div className="m-3 w-full">
                    <TextareaWithLabel
                      labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-purple-600 xsm:text-sm"
                      id="sender-name"
                      label="Sender Name"
                      placeholder="Type the name of the sender"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                    />
                  </div>

                  <div className="container flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row md:gap-16">
                    <div className="m-2 flex w-full flex-col space-y-2">
                      <DropdownWithLabel
                        id="relationship-to-recipient"
                        dropdownClassName="xsm:w-full"
                        label="Who's the recipient to you?"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-purple-600 xsm:text-sm"
                        onSelect={setRelationship}
                        options={RELATIONSHIP_OPTIONS}
                        selectedValue={relationship || undefined}
                        placeholder="Select relationship to recipient"
                      />
                    </div>

                    <div className="mt-2 flex w-full flex-col space-y-2">
                      <DropdownWithLabel
                        id="tone"
                        dropdownClassName="xsm:w-full"
                        label="Tone"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-purple-600 xsm:text-sm"
                        onSelect={setTone}
                        options={TONE_OPTIONS}
                        selectedValue={tone || undefined}
                        placeholder="Select a tone"
                      />
                    </div>
                  </div>

                  <div className="container m-4 flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row md:gap-16">
                    <div className="m-2 flex w-full flex-col space-y-2">
                      <DropdownWithLabel
                        id="occasion"
                        dropdownClassName="xsm:w-full"
                        label="Occasion"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-purple-600 xsm:text-sm"
                        onSelect={setOccasion}
                        options={OCCASION_OPTIONS}
                        selectedValue={occasion || undefined}
                        placeholder="Select the occasion"
                      />
                    </div>

                    <div className="mt-2 flex w-full flex-col space-y-2">
                      <DropdownWithLabel
                        id="closeness"
                        dropdownClassName="xsm:w-full"
                        label="Closeness"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-purple-600 xsm:text-sm"
                        onSelect={setCloseness}
                        options={CLOSENESS_LEVEL_OPTIONS}
                        selectedValue={closeness || undefined}
                        placeholder="Select closeness"
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
                  <Loading projectType={ProjectTypeEnums.GREETIFY_COMPANION} />
                )}

                {gptPromptData && (
                  <GptResponse gptResponse={gptPromptData.response.greeting} />
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
