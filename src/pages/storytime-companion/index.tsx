import { type MouseEvent, useState } from "react";

import { type NextPage } from "next";

import { DropdownWithLabel } from "@/components/common/dropdown-with-label/dropdown-with-label";
import { Button } from "../../components/ui/Button";
import { Hero } from "@/components/common/hero/hero";
import { Error } from "@/components/common/error/error";
import { GptResponse } from "@/components/common/gpt-response";
import { TextareaWithLabel } from "@/components/gpt-response/text-area-with-label";
import { Loading } from "@/components/common/loading-animation/loading";
import { ProjectTypeEnums } from "@/utils/types";
import { PageHeader } from "@/components/common/page-header/page-header";

import { useValidateStorytimeData } from "@/services/hooks/use-validate-data";
import { api } from "@/utils/api";

import {
	AGE_GROUP_OPTIONS,
	MORAL_OF_STORY_OPTIONS,
} from "@/constants/STORYTIME_OPTIONS";

const Home: NextPage = () => {
	const [protagonistName, setProtagonistName] = useState<string>("");
	const [protagonistAdjective, setProtagonistAdjective] = useState<string>("");
	const [moralOfStory, setMoralOfStory] = useState<string>("");
	const [ageGroup, setAgeGroup] = useState<string>("");

	const isDataValid = useValidateStorytimeData(protagonistName, protagonistAdjective, moralOfStory, ageGroup);

	const {
		data: gptPromptData,
		isFetching,
		error,
		refetch,
	} = api.storytime.prompt.useQuery(
		{
			protagonistName,
			protagonistAdjective,
			moralOfStory,
			ageGroup
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
			<PageHeader title="Storytime Companion" />

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
									title="Storytime Companion"
									description="Storytime Companion harnesses the power of ChatGPT, an advanced language model, to assist parents in generating high-quality bedtime stories on various themes and values. With Storytime Companion, parents can effortlessly compose engaging and fun stories tailored to their specific needs."
								/>

								<div className="mt-6 flex flex-col items-center justify-center gap-x-6 md:mt-8">
									<div className="m-3 w-full">
										<TextareaWithLabel
											labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
											id="protagonist-name"
											label="Protagonist Name"
											placeholder="Type the name of the main character of the story"
											value={protagonistName}
											onChange={(e) => setProtagonistName(e.target.value)}
										/>
									</div>

									<div className="m-3 w-full">
										<TextareaWithLabel
											labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
											id="protagonist-adjective"
											label="An adjective to describe your protagonist"
											placeholder="Type an adjective to describe the main character (e.g. little, brave)"
											value={protagonistAdjective}
											onChange={(e) => setProtagonistAdjective(e.target.value)}
										/>
									</div>

									<div className="container flex items-center justify-center gap-1 xsm:flex-col xsm:p-1 md:flex-row md:gap-16">
										<div className="flex w-full flex-col space-y-2">
											<DropdownWithLabel
												id="moral-of-story"
												dropdownClassName="xsm:w-full"
												label="Moral of the Story"
												labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
												onSelect={setMoralOfStory}
												options={MORAL_OF_STORY_OPTIONS}
												selectedValue={moralOfStory || undefined}
												placeholder="Select moral of the story"
											/>
										</div>

										<div className="flex w-full flex-col space-y-2 py-1">
											<DropdownWithLabel
												id="age-group"
												dropdownClassName="xsm:w-full"
												label="Age Group"
												labelClass="md:text-md px-1 text-left font-bold capitalize text-ct-teal-600 xsm:text-sm"
												onSelect={setAgeGroup}
												options={AGE_GROUP_OPTIONS}
												selectedValue={ageGroup || undefined}
												placeholder="Select age group"
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
									<Loading projectType={ProjectTypeEnums.STORYTIME_COMPANION} />
								)}

								{gptPromptData && (
									<GptResponse
										gptResponse={gptPromptData.response.story}
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
