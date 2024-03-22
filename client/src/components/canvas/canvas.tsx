import { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';

type CursorCoordinates = {
  x: number;
  y: number;
};

interface CanvasProps {
  username: string;
}

export const Canvas = ({ username }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [currentCursorCoord, setCurrentCursorCoord] = useState<
    CursorCoordinates | undefined
  >(undefined);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(SOCKET_URL, {
    queryParams: { username },
    share: true,
  });

  const getCursorCoordinates = (event: MouseEvent) => {
    return {
      x: event.clientX - 32,
      y: event.clientY - 32,
    };
  };

  const drawPath = (
    prevCoord: CursorCoordinates,
    nextCoord: CursorCoordinates,
    send: boolean
  ) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.strokeStyle = 'black';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(prevCoord?.x, prevCoord.y);
      ctx.lineTo(nextCoord.x, nextCoord.y);
      ctx.closePath();
      ctx.stroke();

      if (send) {
        sendJsonMessage({
          type: WEBSOCKET_EVENTS.CANVAS_UPDATE,
          drawPath: {
            prevCoord,
            nextCoord,
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
    console.log(`stopped painting`);
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
        const { prevCoord, nextCoord } = lastJsonMessage.drawPath;

        console.log(`received canvas event`);
        drawPath(prevCoord, nextCoord, false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <canvas
      ref={canvasRef}
      className='bg-white'
      width={500}
      height={500}
    ></canvas>
  );
};
