import { useState } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import Select from "react-select";
import { Label } from "@radix-ui/react-label";
import { api } from "@/utils/api";

import { Button } from "../components/ui/Button";
import { SelectDropdown } from "../components/ui/Select";
import { LocationExplorer } from "@/components/location-explorer/location-explorer";

import { useValidateData } from "@/services/hooks/use-validate-data";

import {
  BUDGET_RANGES,
  INTERESTS,
  TRIP_DURATIONS,
} from "@/constants/TRIP_OPTIONS";

const Home: NextPage = () => {
  const [shouldSendPrompt, setShouldSentPrompt] = useState(false);
  const [tripDuration, setTripDuration] = useState<string>();
  const [budgetRange, setBudgetRange] = useState<string>();
  const [selectedUserInterests, setSelectedUserInterests] = useState<
    Array<string>
  >([]);
  const [selectedSourceLocation, setSelectedSourceLocation] = useState("");
  const [selectedDestinationLocation, setSelectedDestinationLocation] =
    useState("");

  const isDataValid = useValidateData(
    tripDuration,
    budgetRange,
    selectedUserInterests,
    selectedSourceLocation,
    selectedDestinationLocation
  );

  const promptQuery = api.journey.prompt.useQuery(
    {
      origin: selectedSourceLocation,
      destination: selectedDestinationLocation,
      duration: tripDuration,
      budget: budgetRange
    },
    {
      enabled: shouldSendPrompt,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  console.log(promptQuery);

  const handleSelectedUserInterests = (e: any) => {
    setSelectedUserInterests(
      Array.isArray(e)
        ? e.map((interest: { label: string }) => interest.label)
        : []
    );
  };

  return (
    <>
      <Head>
        <title>Wanderlust Companion</title>
      </Head>

      <main className="isolate">
        <div className="relative pt-14">
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
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                  Wanderlust Companion
                </h1>

                <p className="mt-8 text-lg leading-8 text-gray-600">
                  Wanderlust Companion is your ultimate travel companion,
                  designed to transform your vacation dreams into unforgettable
                  journeys. With our cutting-edge artificial intelligence
                  powered by ChatGPT, we bring together your travel aspirations,
                  preferences, and interests to curate personalized itineraries
                  that perfectly align with your desires.
                </p>

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
                      <Label
                        className="md:text-md px-1 text-left font-bold capitalize text-gray-700 xsm:text-sm"
                        htmlFor="Trip Duration"
                      >
                        Trip Duration
                      </Label>
                      <SelectDropdown
                        dropdownClassName="xsm:w-full md:w-[185px]"
                        onSelect={setTripDuration}
                        options={TRIP_DURATIONS}
                        selectedValue={tripDuration}
                        placeholder="Select trip duration"
                      />
                    </div>

                    <div className="flex w-full flex-col space-y-2 py-1">
                      <Label
                        className="md:text-md px-1 text-left font-bold capitalize text-gray-700 xsm:text-sm"
                        htmlFor="Budget Range"
                      >
                        Budget Range
                      </Label>
                      <SelectDropdown
                        onSelect={setBudgetRange}
                        dropdownClassName="xsm:w-full md:w-[200px]"
                        options={BUDGET_RANGES}
                        placeholder="Select a budget range"
                        selectedValue={budgetRange}
                      />
                    </div>

                    <div className="flex w-full min-w-[14rem] flex-col space-y-2 py-1">
                      <Label
                        className="md:text-md px-1 text-left font-bold capitalize text-gray-700 xsm:text-sm"
                        htmlFor="Interests"
                      >
                        Interests
                      </Label>
                      <Select
                        instanceId="interests"
                        isMulti
                        onChange={handleSelectedUserInterests}
                        options={INTERESTS}
                        placeholder="Select your interests"
                      />
                    </div>
                  </div>

                  <Button
                    disabled={!isDataValid}
                    className="mt-6 bg-ct-sci-fi xsm:w-full md:w-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isDataValid) {
                        setShouldSentPrompt(true);
                      }
                    }}
                  >
                    Explore!
                  </Button>
                </div>
                <div className="mt-8 flow-root sm:mt-16">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 text-justify ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <div className="text-lg font-bold">
                      {promptQuery.isFetching ? (
                        "Loading..."
                      ) : (
                        <div>{JSON.stringify(promptQuery.data?.response)}</div>
                      )}
                    </div>
                    {/* Day 1, 08/01/23
                    <br />
                    <br />
                    Morning (9am-12pm): Arrival in Barcelona, check into hotel
                    Afternoon (12pm-3pm): Explore Gothic Quarter, including the
                    Barcelona Cathedral and Plaça del Rei Late afternoon
                    (3pm-6pm): Visit Park Güell, one of the most iconic parks in
                    Barcelona and home to unique architecture and stunning views
                    of the city Evening (6pm-9pm): Enjoy a tapas and wine tour,
                    discovering some of the best local cuisine and drinks the
                    city has to offer.
                    <br />
                    <br />
                    Day 2, 08/02/23
                    <br />
                    <br />
                    Morning (9am-12pm): Start the day off with a bike tour of
                    Barcelona, taking in the city&apos;s stunning architecture
                    and sights such as the Sagrada Familia, Casa Batlló, and La
                    Pedrera Afternoon (12pm-3pm): Enjoy a guided tour of Camp
                    Nou, the iconic stadium of FC Barcelona, and immerse
                    yourself in the rich history of soccer in the city Late
                    afternoon (3pm-6pm): Take a stroll down Las Ramblas,
                    Barcelona&apos;s most famous street, and explore the vibrant
                    atmosphere and street performers Evening (6pm-9pm): Relax at
                    Barceloneta Beach, enjoy some seafood and a refreshing
                    cocktail while taking in the beautiful Mediterranean views.
                    <br />
                    <br />
                    Day 3, 08/03/23
                    <br />
                    <br />
                    Morning (9am-12pm): Visit the historic Montserrat Monastery
                    and take in the breathtaking views of the surrounding
                    mountains Afternoon (12pm-3pm): Explore the Gothic Quarter
                    further, taking in the Santa Maria del Mar church and the
                    Picasso Museum Late afternoon (3pm-6pm): Enjoy a wine
                    tasting tour in the Penedès region, known for producing some
                    of the best wines in Spain Evening (6pm-9pm): Try some
                    traditional Catalan cuisine at a local restaurant. */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
