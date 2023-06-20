import { useMemo } from "react";

export const useValidateJourneyData = (
  tripDuration: string,
  budgetRange: string,
  userInterests: Array<string>,
  selectedSourceLocation: string,
  selectedDestinationLocation: string
) => {
  const isDataValid = useMemo(() => {
    const validateTripDuration = () => !!tripDuration && tripDuration !== "";
    const validateBudgetRange = () => !!budgetRange && budgetRange !== "";
    const validateUserInterests = () =>
      !!userInterests && userInterests?.length > 0;
    const validateSelectedSourceLocation = () =>
      !!selectedSourceLocation && selectedSourceLocation !== "";
    const validateDestinationSourceLocation = () =>
      !!selectedDestinationLocation && selectedDestinationLocation !== "";
    const formValidation = [
      validateTripDuration(),
      validateBudgetRange(),
      validateUserInterests(),
      validateSelectedSourceLocation(),
      validateDestinationSourceLocation(),
    ];

    return formValidation.every(
      (validationFunction) => validationFunction === true
    );
  }, [
    budgetRange,
    selectedDestinationLocation,
    selectedSourceLocation,
    userInterests,
    tripDuration,
  ]);

  return isDataValid;
};

export const useValidateWordsmithData = (
  topic: string,
  proficiency: string,
  wordCount: string
) => {
  const isDataValid = useMemo(() => {
    const validateTopic = () => !!topic && topic !== "";
    const validateProficiency = () => !!proficiency && proficiency !== "";
    const validateWordCount = () => !!wordCount && wordCount !== "";
    const formValidation = [
      validateTopic(),
      validateProficiency(),
      validateWordCount(),
    ];

    return formValidation.every(
      (validationFunction) => validationFunction === true
    );
  }, [topic, proficiency, wordCount]);

  return isDataValid;
};

export const useValidateSummaryData = (
  textToSummarise: string,
  wordCount: string,
  isReadingImage: boolean
) => {
  const isDataValid = useMemo(() => {
    const validateWordCount = () => !!wordCount && wordCount !== "";
    const validateTextToSummarise = () =>
      !!textToSummarise && textToSummarise !== "";
    const formValidation = [
      validateWordCount(),
      validateTextToSummarise(),
      !isReadingImage,
    ];

    return formValidation.every(
      (validationFunction) => validationFunction === true
    );
  }, [textToSummarise, wordCount, isReadingImage]);

  return isDataValid;
};
