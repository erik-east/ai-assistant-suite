import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { SelectDropdown } from "../components/ui/Select";
import {
  BUDGET_RANGES,
  INTERESTS,
  TRIP_DURATIONS,
} from "@/constants/TRIP_OPTIONS";
import { LocationExplorer } from "@/components/location-explorer/location-explorer";

const Home: NextPage = () => {
  const [tripDuration, setTripDuration] = useState<string | undefined>();
  const [budgetRange, setBudgetRange] = useState<string | undefined>();
  const [userInterest, setUserInterest] = useState<string | undefined>();
  const [selectedSourceLocation, setSelectedSourceLocation] = useState("");
  const [selectedDestinationLocation, setSelectedDestinationLocation] =
    useState("");

  return (
    <>
      <Head>
        <title>Journey Planner</title>
      </Head>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col md:items-center md:justify-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-4">
          <h1 className="text-center font-bold xsm:text-xl md:text-3xl">
            Journey Planner
          </h1>
          <h2 className="md:text-md text-center xsm:text-sm	">
            Use our friendly AI to plan your next trip with ease
          </h2>
        </div>

        <div className="container flex items-center justify-center xsm:flex-col xsm:gap-1 xsm:p-1 md:flex-row md:gap-8 md:px-4 md:py-8">
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

        <div className="container flex items-center justify-center xsm:flex-col xsm:gap-1 xsm:p-1 md:flex-row md:gap-8 md:px-4 md:py-8">
          <SelectDropdown
            dropdownClassName="xsm:w-full md:w-[230px]"
            onSelect={setTripDuration}
            options={TRIP_DURATIONS}
            selectedValue={tripDuration}
            placeholder="Select trip duration"
          />

          <SelectDropdown
            onSelect={setBudgetRange}
            dropdownClassName="xsm:w-full md:w-[230px]"
            options={BUDGET_RANGES}
            placeholder="Select a budget range"
            selectedValue={budgetRange}
          />

          <SelectDropdown
            onSelect={setUserInterest}
            dropdownClassName="xsm:w-full md:w-[230px]"
            options={INTERESTS}
            placeholder="Select your major interest"
            selectedValue={userInterest}
          />

          <Button className="xsm:w-full md:w-auto">Explore!</Button>
        </div>
      </main>
    </>
  );
};

export default Home;
