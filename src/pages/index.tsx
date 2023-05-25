import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { SelectDropdown } from "../components/ui/Select";
import { BUDGET_RANGES, INTERESTS, TRIP_DURATIONS } from "@/constants/TRIP_OPTIONS";

const Home: NextPage = () => {
  const [tripDuration, setTripDuration] = useState<string | undefined>();
  const [budgetRange, setBudgetRange] = useState<string | undefined>();
  const [userInterest, setUserInterest] = useState<string | undefined>();

  return (
	<>
	  <Head>
		<title>Journey Planner</title>
	  </Head>
	  <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center">
		<div className="container flex flex-col items-center justify-center gap-4 px-4 py-4">
		  <h1 className="text-3xl font-bold">Journey Planner</h1>
		  <h2>Use our friendly AI to plan your next trip with ease</h2>
		</div>
		<div className="container flex flex-row items-center justify-center gap-8 px-4 py-8">
		  <SelectDropdown
			dropdownClassName="w-[190px]"
			onSelect={setTripDuration}
			options={TRIP_DURATIONS}
			selectedValue={tripDuration}
			placeholder="Select trip duration"
		  />

		  <SelectDropdown
			onSelect={setBudgetRange}
			dropdownClassName="w-[215px]"
			options={BUDGET_RANGES}
			placeholder="Select a budget range"
			selectedValue={budgetRange}
		  />

		  <SelectDropdown
			onSelect={setUserInterest}
			dropdownClassName="w-[230px]"
			options={INTERESTS}
			placeholder="Select your major interest"
			selectedValue={userInterest}
		  />

		  <Button>Explore!</Button>
		</div>
	  </main>
	</>
  );
};

export default Home;
