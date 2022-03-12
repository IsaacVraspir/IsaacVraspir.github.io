import { useRef, useEffect } from "react";
export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return typeof ref.current !== "undefined" ? ref.current : value;
}