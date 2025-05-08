import { experimentalData } from "./experimental-data";
import { model } from "./model";

export const objective = (theta: number[]) => {
  const yModel = model(theta);
  let sum = 0;
  for (let i = 0; i < experimentalData.length; i++) {
    sum += (experimentalData[i].y - yModel(experimentalData[i].x)) ** 2;
  }
  return sum;
};
