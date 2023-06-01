import { useState } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import Select from "react-select";
import { Label } from "@radix-ui/react-label";

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
					<div className="flex flex-col space-y-2">
						<Label
							className="md:text-md px-1 capitalize xsm:text-sm"
							htmlFor="Trip Duration"
						>
							Trip Duration
						</Label>
						<SelectDropdown
							dropdownClassName="xsm:w-full md:w-[230px]"
							onSelect={setTripDuration}
							options={TRIP_DURATIONS}
							selectedValue={tripDuration}
							placeholder="Select trip duration"
						/>
					</div>

					<div className="flex flex-col space-y-2">
						<Label
							className="md:text-md px-1 capitalize xsm:text-sm"
							htmlFor="Budget Range"
						>
							Budget Range
						</Label>
						<SelectDropdown
							onSelect={setBudgetRange}
							dropdownClassName="xsm:w-full md:w-[230px]"
							options={BUDGET_RANGES}
							placeholder="Select a budget range"
							selectedValue={budgetRange}
						/>
					</div>

					<div className="flex flex-col space-y-2">
						<Label
							className="md:text-md px-1 capitalize xsm:text-sm"
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

					<Button disabled={!isDataValid} className="mt-6 xsm:w-full md:w-auto">
						Explore!
					</Button>
				</div>
			</main>
		</>
	);
};

export default Home;
