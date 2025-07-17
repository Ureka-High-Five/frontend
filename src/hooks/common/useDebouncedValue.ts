import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSet = useMemo(
    () =>
      debounce((val: T) => {
        setDebouncedValue(val);
      }, delay),
    [delay]
  );

  useEffect(() => {
    debouncedSet(value);

    return () => {
      debouncedSet.cancel();
    };
  }, [value, debouncedSet]);

  return debouncedValue;
};

export default useDebouncedValue;
