/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const defaultAnimationProps = (animationData: unknown) => {
  return {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
};
