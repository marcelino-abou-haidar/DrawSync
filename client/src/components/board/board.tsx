import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useWebSocket from 'react-use-websocket';
import { Canvas, CanvasConfig, Header, Users } from 'src/components';
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
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedBrushSize, setSelectedBrushSize] = useState(1);

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    queryParams: { username },
    share: true,
  });

  const handleEvents = (lastJsonMessage: any) => {
    switch (lastJsonMessage.type) {
      case WEBSOCKET_EVENTS.ALERT_EVENT:
        toast.error(lastJsonMessage.message);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (lastJsonMessage) {
      handleEvents(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return (
    <div className='flex min-h-full flex-col items-center'>
      <Header />
      <div className='h-full w-full max-w-4xl'>
        <Users lastJsonMessage={{}} />
        <Canvas
          username={username}
          brushColor={selectedColor}
          brushSize={selectedBrushSize}
        />
        <CanvasConfig
          colors={COLORS}
          brushSizes={BRUSH_SIZES}
          selectedColor={selectedColor}
          changeColor={setSelectedColor}
          changeBrushSize={setSelectedBrushSize}
        />
      </div>
    </div>
  );
};
