import { useRef, useEffect } from "react";
import Flickity from "flickity";
import "flickity/dist/flickity.min.css";

export default function useFlickity(selector, options = {}, data) {
  const flickityInstance = useRef(null);

  useEffect(() => {
    if (data?.length > 0) {
      flickityInstance.current = new Flickity(selector, options);

      return () => {
        flickityInstance.current.destroy();
      };
    }
  }, [selector, options, data]);

  const handleNextClick = () => {
    if (flickityInstance.current) {
      flickityInstance.current.next();
    }
  };

  const handlePrevClick = () => {
    if (flickityInstance.current) {
      flickityInstance.current.previous();
    }
  };

  return { flickityInstance, handleNextClick, handlePrevClick };
}
