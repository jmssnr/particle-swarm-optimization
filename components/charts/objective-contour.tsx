import { ObjectiveFunction } from "@/core/types";
import { RectClipPath } from "@visx/clip-path";
import { Group } from "@visx/group";
import { extent, range } from "@visx/vendor/d3-array";
import { geoPath } from "@visx/vendor/d3-geo";
import { ScaleLinear, scaleSequentialLog } from "@visx/vendor/d3-scale";
import { contours } from "d3-contour";
import { interpolateYlGnBu } from "d3-scale-chromatic";

const ObjectiveContour = (props: {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  fun: ObjectiveFunction;
}) => {
  const { xScale, yScale, fun } = props;

  const innerWidth = xScale.range()[1];
  const innerHeight = yScale.range()[0];

  const thresholds = range(1, 20).map((i) => Math.pow(2, i));

  const colorScale = scaleSequentialLog(
    extent(thresholds) as [number, number],
    interpolateYlGnBu
  );

  const quality = 2;
  const x0 = -quality / 2;
  const x1 = innerWidth + 28 + quality;
  const y0 = -quality / 2;
  const y1 = innerHeight + quality;
  const n = Math.ceil((x1 - x0) / quality);
  const m = Math.ceil((y1 - y0) / quality);
  const grid = new Array(n * m);
  for (let j = 0; j < m; ++j) {
    for (let i = 0; i < n; ++i) {
      grid[j * n + i] = fun([
        xScale.invert(i * quality + x0),
        yScale.invert(j * quality + y0),
      ]);
    }
  }

  const contour = contours()
    .size([n, m])
    .thresholds(thresholds)(grid)
    .map(({ type, value, coordinates }) => {
      return {
        type,
        value,
        coordinates: coordinates.map((rings) =>
          rings.map((points) =>
            points.map((point) => [
              -quality + quality * point[0],
              -quality + quality * point[1],
            ])
          )
        ),
      };
    });

  return (
    <Group>
      <RectClipPath width={innerWidth} height={innerHeight} id="contour-clip" />
      {contour.map((line, i) => (
        <path
          key={`contour-line-${i}`}
          d={geoPath()(line) || ""}
          stroke={colorScale(line.value)}
          fill={"transparent"}
          clipPath="url(#contour-clip)"
        />
      ))}
    </Group>
  );
};

export default ObjectiveContour;
