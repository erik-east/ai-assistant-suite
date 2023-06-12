import Lottie from "react-lottie";
import * as loadingAnimationData from "../../../public/assets/journey-planner-loading-animation.json";

import { defaultAnimationProps } from "@/utils/lottie-service";

export const JourneyPlannerLoading = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75">
      <div className="bg-gray-700 p-2">
        <Lottie
          options={defaultAnimationProps(loadingAnimationData)}
          isClickToPauseDisabled={true}
          width={200}
          height={200}
        />
        <span className="p-3 font-bold text-white">
          Please wait.. This may take a while..
        </span>
      </div>
    </div>
  );
};
