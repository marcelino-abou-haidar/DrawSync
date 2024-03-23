import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useWebSocket from 'react-use-websocket';
import { Canvas, CanvasConfig, Container, Header, Users } from 'src/components';
import {
  BRUSH_SIZES,
  COLORS,
  SOCKET_URL,
  WEBSOCKET_EVENTS,
} from 'src/utils/constants';

interface BoardProps {
  username: string;
}

export const Board = ({ username }: BoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedBrushSize, setSelectedBrushSize] = useState(1);

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(SOCKET_URL, {
    queryParams: { username },
    share: true,
  });

  const handleEvents = (lastJsonMessage: any) => {
    switch (lastJsonMessage.type) {
      case WEBSOCKET_EVENTS.ALERT_EVENT:
        toast.error(lastJsonMessage.message.alert);
        break;
      default:
        break;
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef?.current;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    sendJsonMessage({ type: WEBSOCKET_EVENTS.CANVAS_UPDATE, command: 'erase' });
  };

  useEffect(() => {
    if (lastJsonMessage) {
      handleEvents(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return (
    <Container>
      <Header />
      <Container className='!mx-14 flex min-h-fit flex-col justify-center md:flex-row'>
        <Users username={username} />
        <Canvas
          username={username}
          brushColor={selectedColor}
          brushSize={selectedBrushSize}
          canvasRef={canvasRef}
        />
        <CanvasConfig
          colors={COLORS}
          brushSizes={BRUSH_SIZES}
          selectedColor={selectedColor}
          changeColor={setSelectedColor}
          changeBrushSize={setSelectedBrushSize}
          clearCanvas={clearCanvas}
        />
      </Container>
    </Container>
  );
};
