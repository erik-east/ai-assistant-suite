import { type MouseEvent, useState } from "react";

import { type NextPage } from "next";

import Head from "next/head";

import { DropdownWithLabel } from "@/components/dropdown-with-label/dropdown-with-label";
import { Button } from "../components/ui/Button";
import { LocationExplorer } from "@/components/location-explorer/location-explorer";
import { GptTripResponse } from "@/components/gpt-trip-response/gpt-trip-response";
import { SelectWithLabel } from "@/components/select-with-label/select-with-label";
import { Hero } from "@/components/hero/hero";
import { Loading } from "@/components/loading-animation/loading";
import { Error } from "@/components/error/error";

import { useValidateJourneyData } from "@/services/hooks/use-validate-data";
import { api } from "@/utils/api";

import {
  BUDGET_RANGES,
  INTERESTS,
  TRIP_DURATIONS,
} from "@/constants/TRIP_OPTIONS";
import { ProjectTypeEnums } from "@/utils/types";

const Home: NextPage = () => {
  const [tripDuration, setTripDuration] = useState<string>("");
  const [budgetRange, setBudgetRange] = useState<string>("");
  const [selectedUserInterests, setSelectedUserInterests] = useState<
    Array<string>
  >([]);
  const [selectedSourceLocation, setSelectedSourceLocation] = useState("");
  const [selectedDestinationLocation, setSelectedDestinationLocation] =
    useState("");

  const isDataValid = useValidateJourneyData(
    tripDuration,
    budgetRange,
    selectedUserInterests,
    selectedSourceLocation,
    selectedDestinationLocation
  );

  const {
    data: gptPromptData,
    isFetching,
    error,
    refetch,
  } = api.journey.prompt.useQuery(
    {
      origin: selectedSourceLocation,
      destination: selectedDestinationLocation,
      duration: tripDuration,
      interests: selectedUserInterests,
      budget: budgetRange,
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const handleSelectedUserInterests = (e: unknown) => {
    setSelectedUserInterests(
      Array.isArray(e)
        ? e.map((interest: { label: string }) => interest.label)
        : []
    );
  };

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await refetch();
  };

  return (
    <>
      <Head>
        <title>Wanderlust Companion</title>
        <link rel="shortcut icon" href="/Epic-Handshake.jpg" />
      </Head>

      <main className="isolate">
        <div className="relative pt-6 md:pt-14">
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

          <div className="py-12 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Hero
                  title="Wanderlust Companion"
                  description="Wanderlust Companion is your ultimate travel companion, designed to transform your vacation dreams into unforgettable journeys. With our cutting-edge artificial intelligence powered by ChatGPT, we bring together your travel aspirations, preferences, and interests to curate personalized itineraries that perfectly align with your desires."
                />

                <div className="mt-6 flex flex-col items-center justify-center gap-x-6 md:mt-8">
                  <div className="container flex items-center justify-center xsm:flex-col xsm:gap-1 xsm:p-1 md:flex-row md:gap-8 md:px-4 md:py-4">
                    <LocationExplorer
                      label="From"
                      selectedLocation={selectedSourceLocation}
                      setSelectedLocation={setSelectedSourceLocation}
                    />
                    <LocationExplorer
                      label="To"
                      selectedLocation={selectedDestinationLocation}
                      setSelectedLocation={setSelectedDestinationLocation}
                    />
                  </div>

                  <div className="container flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row">
                    <div className="flex w-full flex-col space-y-2">
                      <DropdownWithLabel
                        id="trip-duration"
                        dropdownClassName="xsm:w-full md:w-5/6"
                        label="Trip Duration"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
                        onSelect={setTripDuration}
                        options={TRIP_DURATIONS}
                        selectedValue={tripDuration ? tripDuration : undefined}
                        placeholder="Select trip duration"
                      />
                    </div>

                    <div className="flex w-full flex-col space-y-2 py-1">
                      <DropdownWithLabel
                        id="budget-range"
                        dropdownClassName="xsm:w-full md:w-5/6"
                        label="Budget Range"
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
                        onSelect={setBudgetRange}
                        options={BUDGET_RANGES}
                        selectedValue={budgetRange ? budgetRange : undefined}
                        placeholder="Select a budget range"
                      />
                    </div>

                    <div className="flex w-full min-w-[14rem] flex-col space-y-2 py-1">
                      <SelectWithLabel
                        labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
                        instanceId="interests"
                        id="interests"
                        label="Interests"
                        placeholder="Select your interests"
                        isMulti
                        onChange={handleSelectedUserInterests}
                        options={INTERESTS}
                      />
                    </div>
                  </div>

                  <Button
                    disabled={!isDataValid || isFetching}
                    className="mt-6 bg-ct-teal-700 xsm:w-full md:w-auto"
                    onClick={(e) => void handleSearch(e)}
                  >
                    Explore!
                  </Button>
                </div>

                {isFetching && (
                  <Loading
                    projectType={ProjectTypeEnums.WANDERLUST_COMPANION}
                  />
                )}

                {gptPromptData && (
                  <GptTripResponse gptTripResponse={gptPromptData.response} />
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
