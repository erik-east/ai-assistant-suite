import { RadioGroupItem } from "@/components/ui/RadioGroup";
import { SummaryInputTypeEnum } from "@/utils/types";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

interface InputRadioGroupProps {
  handleRadioInputChange: (value: SummaryInputTypeEnum) => void;
  inputType: SummaryInputTypeEnum;
}

export const InputRadioGroup: React.FC<InputRadioGroupProps> = ({
  handleRadioInputChange,
  inputType,
}) => {
  return (
    <div className="m-3 flex w-full justify-center">
      <RadioGroup
        className="flex gap-16"
        value={inputType}
        onValueChange={(value) =>
          handleRadioInputChange(value as SummaryInputTypeEnum)
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={SummaryInputTypeEnum.TEXT} id="text" />
          <Label htmlFor="text">Text</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={SummaryInputTypeEnum.FILE} id="file" />
          <Label htmlFor="file">File</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
