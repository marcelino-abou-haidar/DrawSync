import clsx from 'clsx';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useWebSocket from 'react-use-websocket';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';

type CursorCoordinates = {
  x: number;
  y: number;
};

type CanvasDraw = {
  type: string;
  data: {
    drawPath: {
      prevCoord: CursorCoordinates;
      nextCoord: CursorCoordinates;
    };
    clientBrushColor: string;
    clientBrushSize: number;
  };
};

interface CanvasProps {
  username: string;
  brushColor: string;
  brushSize: number;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  className?: string;
}

export const Canvas = ({
  username,
  brushColor,
  brushSize,
  canvasRef,
  className,
}: CanvasProps) => {
  const [isPainting, setIsPainting] = useState(false);
  const customCursor = useRef(null);
  const [currentCursorCoord, setCurrentCursorCoord] = useState<
    CursorCoordinates | undefined
  >(undefined);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<CanvasDraw>(
    SOCKET_URL,
    {
      queryParams: { username },
      share: true,
    }
  );

  const getCursorCoordinates = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();

    if (!rect || !canvasRef.current) return { x: 0, y: 0 };

    const scaleX = canvasRef.current?.width / rect?.width;
    const scaleY = canvasRef.current?.height / rect?.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const drawPath = (
    prevCoord: CursorCoordinates,
    nextCoord: CursorCoordinates,
    send: boolean,
    clientBrushColor?: string,
    clientBrushSize?: number
  ) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.strokeStyle = clientBrushColor || brushColor;
      ctx.lineJoin = 'round';
      ctx.lineWidth = clientBrushSize || brushSize;

      ctx.beginPath();
      ctx.moveTo(prevCoord?.x, prevCoord.y);
      ctx.lineTo(nextCoord.x, nextCoord.y);
      ctx.closePath();
      ctx.stroke();

      if (send) {
        sendJsonMessage({
          type: WEBSOCKET_EVENTS.CANVAS_DRAW,
          data: {
            drawPath: {
              prevCoord,
              nextCoord,
            },
            clientBrushColor: brushColor,
            clientBrushSize: brushSize,
          },
        });
      }
    }
  };

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newCursorCoordinates = getCursorCoordinates(event);
        if (currentCursorCoord && newCursorCoordinates) {
          drawPath(currentCursorCoord, newCursorCoordinates, true);
          setCurrentCursorCoord(newCursorCoordinates);
        }
      }

      if (!customCursor.current) {
        return;
      }

      const mouseY = event.pageY;
      const mouseX = event.pageX;

      const cursorPointer = customCursor.current as HTMLElement;
      cursorPointer.style.transform = `translate3d(${mouseX - brushSize / 2}px, ${mouseY - brushSize / 2}px, 0)`;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPainting, currentCursorCoord]
  );

  const startPainting = useCallback((event: MouseEvent) => {
    const currentCoordinates = getCursorCoordinates(event);
    setIsPainting(true);
    setCurrentCursorCoord(currentCoordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopPainting = useCallback(() => {
    setIsPainting(false);
  }, []);

  const onMouseEnter = useCallback((size: number, color: string) => {
    if (!customCursor.current) {
      return;
    }

    const cursorPointer = customCursor.current as HTMLElement;
    cursorPointer.style.top = `0`;
    cursorPointer.style.left = `0`;
    cursorPointer.style.display = 'block';
    document.body.style.cursor = 'none';
    cursorPointer.style.width = `${size + 2}px`;
    cursorPointer.style.height = `${size + 2}px`;
    cursorPointer.style.position = `absolute`;
    cursorPointer.style.pointerEvents = `none`;
    cursorPointer.style.backgroundColor = color;
    cursorPointer.style.borderRadius = `50%`;
  }, []);

  const onMouseLeave = () => {
    document.body.style.cursor = 'default';

    if (!customCursor.current) {
      return;
    }

    const cursorPointer = customCursor.current as HTMLElement;
    cursorPointer.style.display = `none`;
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);

    return () => {
      canvas.removeEventListener('mouseup', stopPainting);
      canvas.removeEventListener('mouseleave', stopPainting);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopPainting]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startPainting);

    return () => canvas.removeEventListener('mousedown', startPainting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPainting]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);

    return () => canvas.removeEventListener('mousemove', paint);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paint]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mouseenter', () => {
      onMouseEnter(brushSize, brushColor);
    });
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      canvas.removeEventListener('mouseenter', () => {
        onMouseEnter(brushSize, brushColor);
      });
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [brushColor, brushSize, canvasRef, onMouseEnter]);

  useEffect(() => {
    if (lastJsonMessage) {
      switch (lastJsonMessage.type) {
        case WEBSOCKET_EVENTS.CANVAS_DRAW:
          {
            const data = lastJsonMessage.data;
            const { clientBrushColor, clientBrushSize } = data;
            const { prevCoord, nextCoord } = data.drawPath;

            drawPath(
              prevCoord,
              nextCoord,
              false,
              clientBrushColor,
              clientBrushSize
            );
          }
          break;

        case WEBSOCKET_EVENTS.CANVAS_CLEAR:
          {
            if (!canvasRef.current) {
              return;
            }

            const canvas = canvasRef?.current;
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
          }
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <>
      <div ref={customCursor}></div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className={clsx('aspect-auto h-full w-full shrink bg-white', className)}
      ></canvas>
    </>
  );
};
