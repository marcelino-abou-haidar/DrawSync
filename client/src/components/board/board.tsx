import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useWebSocket from 'react-use-websocket';
import { Canvas } from 'src/components';
import { SOCKET_URL } from 'src/utils/constants';

interface BoardProps {
  username: string;
}

export const Board = ({ username }: BoardProps) => {
  console.log(username);
  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    SOCKET_URL,
    {
      queryParams: { username },
    }
  );

  const handleEvents = (lastJsonMessage: any) => {
    if (lastJsonMessage.type === 'alert-event') {
      toast.error(lastJsonMessage.message);
    }
  };

  useEffect(() => {
    if (lastJsonMessage) {
      handleEvents(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return <Canvas />;
};
