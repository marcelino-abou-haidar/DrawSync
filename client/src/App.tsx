import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { Container } from 'src/components';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';

type lastJsonMessageAlert = {
  type: string;
  message: {
    data: string;
  };
};

function App() {
  const { lastJsonMessage } = useWebSocket<lastJsonMessageAlert>(SOCKET_URL, {
    share: true,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === WEBSOCKET_EVENTS.ALERT_EVENT) {
        toast.error(lastJsonMessage.message.data);
      }
    }
  }, [lastJsonMessage]);

  return (
    <div className='min-h-full bg-blue-600 bg-puzzles-pattern font-roboto-mono'>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
