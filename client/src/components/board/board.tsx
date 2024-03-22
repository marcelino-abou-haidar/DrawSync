import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useWebSocket from 'react-use-websocket';
import { Canvas } from 'src/components';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';

interface BoardProps {
  username: string;
}

export const Board = ({ username }: BoardProps) => {
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

  return <Canvas username={username} />;
};
