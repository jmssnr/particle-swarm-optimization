export class Particle {
  position: number[];
  velocity: number[];
  bestPosition: number[];

  constructor(initialPosition: number[], initialVelocity: number[]) {
    this.position = initialPosition;
    this.velocity = initialVelocity;
    this.bestPosition = initialPosition;
  }
}
