import Avvvatars from 'avvvatars-react';
import useWebSocket from 'react-use-websocket';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';
interface ActiveUsersProps {
  username: string;
}

export const Users = ({ username }: ActiveUsersProps) => {
  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    queryParams: { username },
    share: true,
  });

  return (
    <div className='min-w-32 rounded-l-lg bg-slate-500 p-4 lg:min-w-60 lg:max-w-80'>
      <h2 className='mb-2 font-bold tracking-widest'>Connected users</h2>
      <div className='flex gap-2 overflow-x-auto p-2'>
        {lastJsonMessage?.type === WEBSOCKET_EVENTS.USER_EVENT
          ? Object.keys(lastJsonMessage?.message.connectedUsers).map((uuid) => {
              const { username } =
                lastJsonMessage?.message?.connectedUsers[uuid];

              return (
                <div className='inline-block' key={uuid}>
                  <Avvvatars
                    border={true}
                    borderColor='darkgray'
                    value={username}
                    radius={4}
                    data-tooltip-id='tooltip'
                    data-tooltip-content={username}
                    data-tooltip-place='top'
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
