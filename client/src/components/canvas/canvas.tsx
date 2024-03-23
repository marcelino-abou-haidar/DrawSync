import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';

type CursorCoordinates = {
  x: number;
  y: number;
};

interface CanvasProps {
  username: string;
  brushColor: string;
  brushSize: number;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export const Canvas = ({
  username,
  brushColor,
  brushSize,
  canvasRef,
}: CanvasProps) => {
  const [isPainting, setIsPainting] = useState(false);
  const [currentCursorCoord, setCurrentCursorCoord] = useState<
    CursorCoordinates | undefined
  >(undefined);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(SOCKET_URL, {
    queryParams: { username },
    share: true,
  });

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
          type: WEBSOCKET_EVENTS.CANVAS_UPDATE,
          command: 'draw',
          drawPath: {
            prevCoord,
            nextCoord,
          },
          clientBrushColor: brushColor,
          clientBrushSize: brushSize,
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPainting, currentCursorCoord]
  );

  const startPainting = useCallback((event: MouseEvent) => {
    const currentCoordinates = getCursorCoordinates(event);
    setIsPainting(true);
    setCurrentCursorCoord(currentCoordinates);
  }, []);

  const stopPainting = useCallback(() => {
    setIsPainting(false);
  }, []);

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
  }, [startPainting]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);

    return () => canvas.removeEventListener('mousemove', paint);
  }, [paint]);

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === WEBSOCKET_EVENTS.CANVAS_UPDATE) {
        switch (lastJsonMessage.command) {
          case 'draw':
            {
              const { clientBrushColor, clientBrushSize } = lastJsonMessage;
              const { prevCoord, nextCoord } = lastJsonMessage.drawPath;

              drawPath(
                prevCoord,
                nextCoord,
                false,
                clientBrushColor,
                clientBrushSize
              );
            }
            break;
          case 'erase': {
            if (!canvasRef) {
              break;
            }

            const canvas = canvasRef?.current;
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            break;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className='aspect-auto h-full w-full shrink cursor-crosshair bg-white'
    ></canvas>
  );
};
