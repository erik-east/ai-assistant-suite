import { useMemo } from "react";

export const useValidateData = (
  tripDuration: string | undefined,
  budgetRange: string | undefined,
  userInterests: Array<string>,
  selectedSourceLocation: string,
  selectedDestinationLocation: string
) => {
  const isDataValid = useMemo(() => {
    const validateTripDuration = () => !!tripDuration && tripDuration !== "";
    const validateBudgetRange = () => !!budgetRange && budgetRange !== "";
    const validateUserInterests = () => !!userInterests && userInterests?.length > 0;
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
