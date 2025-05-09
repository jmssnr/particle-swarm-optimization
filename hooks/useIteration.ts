import { useEffect, useState } from "react";

export const useIteration = (totalIterations: number) => {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIteration((previous) => (previous + 1) % totalIterations);
    }, 250);

    return () => clearInterval(intervalId);
  }, []);

  return iteration;
};
