import { objective } from "./objective";
import { Particle } from "./particle";
import { particleSwarmOptimization } from "./particle-swarm-optimization";
import { uniformRandomSample } from "./uniform-random-sample";

export const minimize = (
  w: number = 0.1,
  c1: number = 0.25,
  c2: number = 2
) => {
  const initialPopulation: Particle[] = [];
  const maximumIterations = 10;
  for (let i = 0; i < 20; i++) {
    initialPopulation.push(
      new Particle(
        [uniformRandomSample(10, 35), uniformRandomSample(-2, 6)],
        [0, 0]
      )
    );
  }
  return particleSwarmOptimization(
    objective,
    initialPopulation,
    maximumIterations,
    w,
    c1,
    c2
  );
};
