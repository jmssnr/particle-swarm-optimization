import { useEffect, useRef } from "react";

export const useAnimationFrame = (animationHandler: () => void) => {
  // init ref with fake animation frame ID
  const frame = useRef(0);

  const animate = () => {
    animationHandler();
    // update ref to new animation frame ID
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // update ref to new animation frame ID
    frame.current = requestAnimationFrame(animate);

    // kill animation cycle on component unmount
    return () => cancelAnimationFrame(frame.current);
    // start animation on first render
  }, []);
};
