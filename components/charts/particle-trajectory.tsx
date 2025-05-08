"use client";
import * as allCurves from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";

const ParticleTrajectory = <Datum extends object>(
  props: React.ComponentProps<typeof LinePath<Datum>>
) => {
  const progressPercent = useMotionValue(0);
  const pathRefForeground = useRef<SVGPathElement>(null);
  const [point, setPoint] = useState([0, 0]);

  const { data, x, y, ...otherProps } = props;

  useMotionValueEvent(progressPercent, "change", (latest) => {
    const pathElementForeground = pathRefForeground.current;

    if (pathElementForeground) {
      const totalPathLength = pathElementForeground.getTotalLength();

      const latestPathProgress = pathElementForeground.getPointAtLength(
        latest * totalPathLength
      );

      setPoint([latestPathProgress.x, latestPathProgress.y]);
    }
  });

  return (
    <Group>
      <LinePath
        data={data}
        x={x}
        y={y}
        {...otherProps}
        curve={allCurves["curveNatural"]}
      >
        {({ path }) => (
          <motion.path
            ref={pathRefForeground}
            style={{ pathLength: progressPercent }}
            d={path(data!) || ""}
            className="stroke-chart-2 fill-none"
            initial={{ pathLength: 0.001, opacity: 1 }}
            animate={{
              pathLength: 1,
              opacity: 0,
            }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
        )}
      </LinePath>
      <circle
        cx={point[0]}
        cy={point[1]}
        r={6}
        className={"fill-chart-2 animate-pulse opacity-30"}
      />
      <circle cx={point[0]} cy={point[1]} r={3} className={"fill-chart-2"} />
    </Group>
  );
};

export default ParticleTrajectory;
