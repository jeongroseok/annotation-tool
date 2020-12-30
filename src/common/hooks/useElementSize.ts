import { RefObject, useCallback, useEffect, useState } from "react";

/**
 * element의 사이즈를 구하는 훅
 */
export default function useElementSize(
  elRef: RefObject<HTMLElement | undefined>
) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    if (!elRef) return;
    if (!elRef.current) return;
    setSize({
      width: elRef.current.clientWidth,
      height: elRef.current.clientHeight,
    });
  }, [elRef]);

  useEffect(() => {
    if (!(elRef && elRef.current)) {
      return;
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elRef]);

  return size;
}
