import { useCallback, useEffect, useRef, useState } from 'react';
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
}

export const Canvas = ({ username, brushColor, brushSize }: CanvasProps) => {
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
    const rect = canvasRef.current?.getBoundingClientRect();
    console.log(rect);
    if (!rect) return { x: 0, y: 0 };
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
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
    console.log(`started painting`);
    const currentCoordinates = getCursorCoordinates(event);
    setIsPainting(true);
    setCurrentCursorCoord(currentCoordinates);
  }, []);

  const stopPainting = useCallback(() => {
    console.log(`stopped painting`);
    setIsPainting(false);
  }, []);

  // const ASPECT_RATIO = 16 / 9;

  /*   const resizeCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    canvas.width = containerWidth;
    canvas.height = containerHeight;
  }; */

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
        const { clientBrushColor, clientBrushSize } = lastJsonMessage;
        const { prevCoord, nextCoord } = lastJsonMessage.drawPath;

        console.log(`received canvas event`);
        drawPath(
          prevCoord,
          nextCoord,
          false,
          clientBrushColor,
          clientBrushSize
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  /*   useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); */

  return <canvas ref={canvasRef} className=' bg-white'></canvas>;
};
