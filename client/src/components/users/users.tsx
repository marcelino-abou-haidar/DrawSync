import Avvvatars from 'avvvatars-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PiPencilSimpleLight } from 'react-icons/pi';
import useWebSocket from 'react-use-websocket';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';
interface ActiveUsersProps {
  className?: string;
}

type User = {
  [key: string]: {
    username: string;
    isPainting: boolean;
  };
};

type UsersListType = {
  type: string;
  data: User;
};

export const Users = ({ className }: ActiveUsersProps) => {
  const [usersList, setUsersList] = useState<User>({});
  const { lastJsonMessage } = useWebSocket<UsersListType>(SOCKET_URL, {
    share: true,
  });

  useEffect(() => {
    if (lastJsonMessage?.type === WEBSOCKET_EVENTS.USERS_LIST) {
      setUsersList(lastJsonMessage.data);
    }
  }, [lastJsonMessage]);

  return (
    <div
      className={clsx(
        ' min-w-[140] rounded-b-lg border-t-2 border-gray-200 bg-[#fcfcfc]  md:rounded-bl-lg md:rounded-br-none md:rounded-tl-lg  md:border-r-2 md:border-t-0 lg:min-w-60 lg:max-w-80',
        className
      )}
    >
      <div className='h-[100%]'>
        <h2 className='-mb--space-3xs -px--space-s -pt--space-s -text--step--1 font-bold tracking-widest'>
          Active users
        </h2>
        <ErrorBoundary
          fallback={<div>There was an error fetching active users.</div>}
        >
          <div className='flex max-h-[92%] flex-1 gap-1 overflow-x-auto md:flex-col'>
            {Object.keys(usersList).length > 0 ? (
              Object?.keys(usersList)?.map((uuid, index) => {
                const { username, isPainting } = usersList[uuid];
                return (
                  <div
                    className={clsx(
                      'flex items-center gap-2 -p--space-2xs -px--space-s',
                      index % 2 === 0 ? 'bg-[#f4f4f4]' : ''
                    )}
                    key={uuid}
                  >
                    <div
                      data-tooltip-id='tooltip'
                      data-tooltip-content={username}
                      data-tooltip-place='top'
                    >
                      <Avvvatars
                        border={true}
                        borderColor='darkgray'
                        value={username}
                      />
                    </div>
                    <p className='-text--step--2'>{username}</p>
                    <div className='h-4 w-4'>
                      {isPainting ? <PiPencilSimpleLight /> : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='-p--space-2xs -px--space-s'>
                <h3 className=' -text--step--2'>No users to show</h3>
              </div>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};
