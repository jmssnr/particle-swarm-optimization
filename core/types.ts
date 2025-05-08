import { Particle } from "./particle";

export type ObjectiveFunction = (x: number[]) => number;

export type PSOResult = {
  particleTrajectories: Particle[];
  bestPosition: Particle["position"];
}[];
