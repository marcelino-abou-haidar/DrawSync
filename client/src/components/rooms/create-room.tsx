import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { ROUTES } from 'src/routes/constants';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';
import { getRoute } from 'src/utils/helpers';

type lastJsonMessageRoomCreated = {
  type: string;
  message: {
    roomId: string;
  };
};

export const CreateRoom = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<lastJsonMessageRoomCreated>(SOCKET_URL, {
      share: true,
    });

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: {
        value: string;
      };
    };

    if (target.username.value) {
      sendJsonMessage({
        type: WEBSOCKET_EVENTS.ROOM_CREATE,
        message: {
          username: target.username.value,
        },
      });
    }
  };

  const goToJoinRoom = () => {
    navigate(ROUTES.ROOM_JOIN);
  };

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === WEBSOCKET_EVENTS.ROOM_CREATED) {
        navigate(
          getRoute(ROUTES.DRAWING_BOARD, lastJsonMessage.message.roomId)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage, navigate]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-white'>
      <h2 className='-mb--space-xs font-gluten -text--step-2 font-bold'>
        Welcome back!
      </h2>
      <div className='flex flex-col rounded-lg bg-white -px--space-m -py--space-s text-black'>
        <h3 className=' -mb--space-3xs -text--step-0 font-semibold'>
          Create a room
        </h3>
        <form className='flex flex-col' onSubmit={handleFormSubmit}>
          <label
            htmlFor='username'
            className='-mb--space-3xs -text--step--2 font-semibold'
          >
            Username
          </label>
          <input
            required
            type='text'
            name='username'
            id='username'
            placeholder='Enter username'
            className='-mb--space-2xs rounded-lg border -px--space-2xs -py--space-3xs -text--step--2'
            onChange={(e) => {
              if (e.target.value.length >= 3) {
                setDisabled(false);
              } else {
                setDisabled(true);
              }
            }}
          />
          <button
            disabled={disabled}
            type='submit'
            className='rounded-lg bg-slate-700  -p--space-2xs -text--step--2 font-medium text-white hover:bg-slate-600 active:bg-slate-300 active:text-black disabled:bg-gray-300'
          >
            Create room
          </button>
          <a
            onClick={goToJoinRoom}
            className='cursor-pointer -py--space-2xs -text--step--2 text-blue-700 hover:underline'
          >
            Want to join a room instead?
          </a>
        </form>
      </div>
    </div>
  );
};
