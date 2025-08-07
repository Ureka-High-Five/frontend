import { useCallback, useEffect, useRef } from "react";

interface UseOutsideClickProps {
  onClickOutside: () => void;
}

const useOutsideClick = ({ onClickOutside }: UseOutsideClickProps) => {
  const outsideRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const inside = outsideRef.current?.contains(event.target as Node);

      if (outsideRef.current && !inside) {
        onClickOutside();
      }
    },

    [onClickOutside]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [handleClickOutside]);

  return outsideRef;
};

export default useOutsideClick;
