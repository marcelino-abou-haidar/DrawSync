import { useCallback, useEffect, useRef, useState } from "react";

type CursorCoordinates = {
  x: number;
  y: number;
};
export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [currentCursorCoord, setCurrentCursorCoord] = useState<
    CursorCoordinates | undefined
  >(undefined);

  const getCursorCoordinates = (event: MouseEvent) => {
    return {
      x: event.clientX - 32,
      y: event.clientY - 32,
    };
  };

  const drawPath = (
    prevCoord: CursorCoordinates,
    nextCoord: CursorCoordinates,
  ) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = "black";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(prevCoord?.x, prevCoord.y);
      ctx.lineTo(nextCoord.x, nextCoord.y);
      ctx.closePath();
      ctx.stroke();
    }
  };

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newCursorCoordinates = getCursorCoordinates(event);
        if (currentCursorCoord && newCursorCoordinates) {
          drawPath(currentCursorCoord, newCursorCoordinates);
          setCurrentCursorCoord(newCursorCoordinates);
        }
      }
    },
    [isPainting, currentCursorCoord],
  );

  const startPainting = useCallback((event: MouseEvent) => {
    const currentCoordinates = getCursorCoordinates(event);
    setIsPainting(true);
    setCurrentCursorCoord(currentCoordinates);
  }, []);

  const stopPainting = useCallback(() => {
    setIsPainting(false);
    console.log(`stopped painting`);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);

    return () => {
      canvas.removeEventListener("mouseup", stopPainting);
      canvas.removeEventListener("mouseleave", stopPainting);
    };
  }, [stopPainting]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", startPainting);

    return () => canvas.removeEventListener("mousedown", startPainting);
  }, [startPainting]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", paint);

    return () => canvas.removeEventListener("mousemove", paint);
  }, [paint]);

  return (
    <canvas
      ref={canvasRef}
      className="bg-white"
      width={500}
      height={500}
    ></canvas>
  );
};
