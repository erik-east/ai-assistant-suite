import { useMemo } from "react";

export const useValidateData = (
  tripDuration: string | undefined,
  budgetRange: string | undefined,
  userInterest: string | undefined,
  selectedSourceLocation: string,
  selectedDestinationLocation: string
) => {
  const isDataValid = useMemo(() => {
    const validateTripDuration = () => !!tripDuration && tripDuration !== "";
    const validateBudgetRange = () => !!budgetRange && budgetRange !== "";
    const validateUserInterest = () => !!userInterest && userInterest !== "";
    const validateSelectedSourceLocation = () =>
      !!selectedSourceLocation && selectedSourceLocation !== "";
    const validateDestinationSourceLocation = () =>
      !!selectedDestinationLocation && selectedDestinationLocation !== "";
    const formValidation = [
      validateTripDuration(),
      validateBudgetRange(),
      validateUserInterest(),
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
    userInterest,
    tripDuration,
  ]);

  return isDataValid;
};
