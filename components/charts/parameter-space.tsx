import { Particle } from "@/core/particle";
import { ObjectiveFunction } from "@/core/types";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { motion } from "motion/react";
import { MARGIN } from "./margin";
import ObjectiveContour from "./objective-contour";
const ParameterSpace = (props: {
  width: number;
  height: number;
  objective: ObjectiveFunction;
  xExtent: [number, number];
  yExtent: [number, number];
  particleTrajectories: Particle[][];
  iteration: number;
}) => {
  const {
    width,
    height,
    xExtent,
    yExtent,
    objective,
    particleTrajectories,
    iteration,
  } = props;

  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: xExtent,
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: yExtent,
  });

  const animatedCircles = particleTrajectories[iteration].map(
    (particle, index) => (
      <Group key={`circle-${index}`}>
        {particleTrajectories[iteration - 1] && (
          <motion.line
            animate={{
              opacity: [0.5, 0],
              pathLength: [0.5, 0.6],
              x1: xScale(
                particleTrajectories[iteration - 1][index].position[0]
              ),
              y1: yScale(
                particleTrajectories[iteration - 1][index].position[1]
              ),
              x2: xScale(particleTrajectories[iteration][index].position[0]),
              y2: yScale(particleTrajectories[iteration][index].position[1]),
            }}
            transition={{ type: "tween" }}
            className="stroke-chart-1 fill-none opacity-25"
          />
        )}
        <motion.circle
          animate={{
            cx: xScale(particle.position[0]),
            cy: yScale(particle.position[1]),
          }}
          r={4}
          transition={{ type: "tween" }}
          className="fill-chart-1 opacity-70"
        />
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{
            cx: xScale(particle.position[0]),
            cy: yScale(particle.position[1]),
            opacity: 1,
          }}
          r={8}
          transition={{ type: "tween" }}
          className="fill-chart-1 opacity-20"
        />
      </Group>
    )
  );

  return (
    <svg width={width} height={height}>
      <Group left={MARGIN.left} top={MARGIN.top}>
        <ObjectiveContour xScale={xScale} yScale={yScale} fun={objective} />
        {animatedCircles}
      </Group>
    </svg>
  );
};

export default ParameterSpace;
