import { minimize } from "@/core/minimize";
import { useMemo } from "react";

export const useOptimize = (
  inertiaWeight: number,
  cognitiveWeight: number,
  socialWeight: number
) => {
  return useMemo(
    () => minimize(inertiaWeight, cognitiveWeight, socialWeight),
    [inertiaWeight, cognitiveWeight, socialWeight]
  );
};
