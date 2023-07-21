import { useMemo } from "react";

const validateInputForType = (input: string | string[] | boolean) => {
  if (Array.isArray(input)) {
    return !!input && input?.length > 0;
  }

  switch (typeof input) {
    case "boolean":
      return input;
    case "string":
    default:
      return !!input && input !== "";
  }
};

export const useValidateData = (inputs: (string | boolean | string[])[]) => {
  const isDataValid = useMemo(() => {
    return inputs.every((input) => validateInputForType(input));
  }, [inputs]);

  return isDataValid;
};
