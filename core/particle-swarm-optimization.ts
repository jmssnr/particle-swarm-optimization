import { Particle } from "./particle";
import { ObjectiveFunction, PSOResult } from "./types";
import { uniformRandomSample } from "./uniform-random-sample";

export const particleSwarmOptimization = (
  fun: ObjectiveFunction,
  population: Particle[],
  maxIterations: number,
  w: number,
  c1: number,
  c2: number
) => {
  const designDimensions = population[0].position.length;
  let xBest = population[0].bestPosition;
  let yBest = Infinity;

  for (let i = 0; i < population.length; i++) {
    const y = fun(population[i].position);
    if (y < yBest) {
      xBest = population[i].position;
      yBest = y;
    }
  }

  const result: PSOResult = [
    {
      particleTrajectories: [...structuredClone(population)],
      bestPosition: structuredClone(xBest),
    },
  ];

  for (let k = 0; k < maxIterations; k++) {
    for (let i = 0; i < population.length; i++) {
      for (let j = 0; j < designDimensions; j++) {
        const r1 = uniformRandomSample(0, 1);
        const r2 = uniformRandomSample(0, 1);
        population[i].position[j] += population[i].velocity[j];
        population[i].velocity[j] =
          w * population[i].velocity[j] +
          c1 *
            r1 *
            (population[i].bestPosition[j] - population[i].position[j]) +
          c2 * r2 * (xBest[j] - population[i].position[j]);
      }

      const y = fun(population[i].position);

      if (y < yBest) {
        xBest = population[i].position;
        yBest = y;
      }

      if (y < fun(population[i].bestPosition)) {
        population[i].bestPosition = population[i].position;
      }
    }

    result.push({
      particleTrajectories: [...structuredClone(population)],
      bestPosition: structuredClone(xBest),
    });
  }

  return result;
};
