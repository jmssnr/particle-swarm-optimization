import { Hyperparameter } from "@/core/types";
import { useState } from "react";

export const useHyperparameters = () => {
  const [parameters, setParameters] = useState<Hyperparameter[]>([
    { id: "inertia", value: 0.1 },
    { id: "cognitive", value: 0.25 },
    { id: "social", value: 1 },
  ]);

  const setHyperparameter = (id: string) => {
    return (newValue: number) => {
      const nextParameters = parameters.map((parameter) =>
        parameter.id === id ? { ...parameter, value: newValue } : parameter
      );
      setParameters(nextParameters);
    };
  };

  const getHyperparameter = (id: string) =>
    parameters.find((parameter) => parameter.id === id)!.value;

  return { getHyperparameter, setHyperparameter };
};
