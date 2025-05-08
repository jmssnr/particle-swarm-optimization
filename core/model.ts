export const model = (theta: number[]) => {
  return (x: number) => theta[0] * (1 - Math.exp(-theta[1] * x));
};
