import Lottie from "react-lottie";
import * as loadingAnimationData from "../../../public/assets/loading-animation.json";

import { defaultAnimationProps } from "@/utils/lottie-service";

const GPTChatLoading = () => {
  return (
    <div className="justify-center self-center">
      <Lottie
        options={defaultAnimationProps(loadingAnimationData)}
        isClickToPauseDisabled={true}
        width={50}
        height={50}
      />
    </div>
  );
};

export default GPTChatLoading;
