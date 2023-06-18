import React from "react";

export const Hero = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h1 className="text-5xl font-bold tracking-tight text-ct-teal-500">
        {title}
      </h1>

      <p className="text-md mx-auto mt-8 max-w-2xl leading-8 text-ct-purple-500">
        {description}
      </p>
    </>
  );
};
