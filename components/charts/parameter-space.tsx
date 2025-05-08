import { ObjectiveFunction } from "@/core/types";
import { scaleLinear } from "@visx/scale";
import { MARGIN } from "./margin";
import { Group } from "@visx/group";
import ObjectiveContour from "./objective-contour";

const ParameterSpace = (props: {
  width: number;
  height: number;
  objective: ObjectiveFunction;
  xExtent: [number, number];
  yExtent: [number, number];
}) => {
  const { width, height, xExtent, yExtent, objective } = props;

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

  return (
    <svg width={width} height={height}>
      <Group left={MARGIN.left} top={MARGIN.top}>
        <ObjectiveContour xScale={xScale} yScale={yScale} fun={objective} />
      </Group>
    </svg>
  );
};

export default ParameterSpace;
