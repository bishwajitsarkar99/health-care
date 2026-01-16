import { useRef, useLayoutEffect } from "react";
import { setRAM, getRAM, cleanupInvalidMenuRAM } from "@/helper/MenuCardDesignmemory";

type Direction = "left" | "right" | "top" | "bottom";

const MIN_WIDTH = 120;
const MIN_HEIGHT = 70;

export function useMenuCardResize(cardId: string) {
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRectRef = useRef<SVGRectElement>(null);

  /* ================= APPLY STORED SIZE ================= */

  useLayoutEffect(() => {
    cleanupInvalidMenuRAM();

    const card = cardRef.current;
    if (!card) return;

    let w = getRAM(cardId, "Width");
    let h = getRAM(cardId, "Height");
    let l = getRAM(cardId, "Left");
    let t = getRAM(cardId, "Top");

    // Guard corrupted RAM
    if (typeof w === "number" && w < MIN_WIDTH) w = null;
    if (typeof h === "number" && h < MIN_HEIGHT) h = null;

    // Save defaults only once
    if (w === null) setRAM(cardId, "Width", card.offsetWidth);
    if (h === null) setRAM(cardId, "Height", card.offsetHeight);
    if (l === null) setRAM(cardId, "Left", card.offsetLeft);
    if (t === null) setRAM(cardId, "Top", card.offsetTop);

    const width = Math.max(MIN_WIDTH, w ?? card.offsetWidth);
    const height = Math.max(MIN_HEIGHT, h ?? card.offsetHeight);
    const left = l ?? card.offsetLeft;
    const top = t ?? card.offsetTop;

    card.style.position = "absolute";
    card.style.width = `${width}px`;
    card.style.height = `${height}px`;
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, [cardId]);

  /* ================= BORDER ANIMATION ================= */

  const animateBorder = () => {
    const card = cardRef.current;
    const rect = svgRectRef.current;
    if (!card || !rect) return;

    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("rx", "3");
    rect.setAttribute("ry", "3");
    rect.setAttribute("width", `${card.offsetWidth}`);
    rect.setAttribute("height", `${card.offsetHeight}`);

    rect.style.display = "block";
    rect.style.stroke = "dodgerblue";
    rect.style.strokeWidth = "3";
    rect.style.strokeDasharray = "5,5";
    rect.style.animation = "dashmove 1s linear infinite";
  };

  const stopBorderAnimation = () => {
    const rect = svgRectRef.current;
    if (!rect) return;

    rect.style.animation = "none";
    rect.style.display = "none";
  };

  /* ================= RESIZE HANDLER (POINTER SAFE) ================= */

  const onResizeStart =
    (dir: Direction) => (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();

      const card = cardRef.current;
      if (!card) return;

      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);

      const startX = e.pageX;
      const startY = e.pageY;

      const startWidth = Math.max(MIN_WIDTH, card.offsetWidth);
      const startHeight = Math.max(MIN_HEIGHT, card.offsetHeight);
      const startLeft = card.offsetLeft;
      const startTop = card.offsetTop;

      animateBorder();

      const move = (ev: PointerEvent) => {
        const dx = ev.pageX - startX;
        const dy = ev.pageY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        if (dir === "right") newWidth = startWidth + dx;

        if (dir === "left") {
          newWidth = startWidth - dx;
          card.style.left = `${startLeft + dx}px`;
        }

        if (dir === "bottom") newHeight = startHeight + dy;

        if (dir === "top") {
          newHeight = startHeight - dy;
          card.style.top = `${startTop + dy}px`;
        }

        newWidth = Math.max(MIN_WIDTH, newWidth);
        newHeight = Math.max(MIN_HEIGHT, newHeight);

        card.style.width = `${newWidth}px`;
        card.style.height = `${newHeight}px`;

        const rect = svgRectRef.current;
        if (rect) {
          rect.setAttribute("width", `${newWidth}`);
          rect.setAttribute("height", `${newHeight}`);
        }
      };

      const up = (ev: PointerEvent) => {
        target.releasePointerCapture(ev.pointerId);

        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);

        stopBorderAnimation();

        setRAM(cardId, "Width", Math.max(MIN_WIDTH, card.offsetWidth));
        setRAM(cardId, "Height", Math.max(MIN_HEIGHT, card.offsetHeight));
        setRAM(cardId, "Left", card.offsetLeft);
        setRAM(cardId, "Top", card.offsetTop);
      };

      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    };

  return {
    cardRef,
    svgRectRef,
    onResizeStart,
    animateBorder,
    stopBorderAnimation,
  };
}

