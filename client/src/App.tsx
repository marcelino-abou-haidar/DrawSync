import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Container } from 'src/components';
import { ROUTES } from 'src/routes/constants';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';

type lastJsonMessageAlert = {
  type: string;
  message: {
    data: string;
  };
};

function App() {
  const navigate = useNavigate();
  const handleError = (event: WebSocketEventMap['close']) => {
    if (!event || !event.target) {
      return;
    }

    const target = event.target as WebSocket;

    if (target.readyState === ReadyState.CLOSED) {
      toast.error('Lost connection to the server.');
      console.log(event);
    }
  };

  const { lastJsonMessage, readyState } = useWebSocket<lastJsonMessageAlert>(
    SOCKET_URL,
    {
      share: true,
      onClose: handleError,
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === WEBSOCKET_EVENTS.ALERT_EVENT) {
        toast.error(lastJsonMessage.message.data);
      }
    }

    if (readyState === ReadyState.CLOSED) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage, readyState]);

  return (
    <div className='min-h-full bg-blue-600 bg-puzzles-pattern font-roboto-mono'>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
