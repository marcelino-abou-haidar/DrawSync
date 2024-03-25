import Avvvatars from 'avvvatars-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { SOCKET_URL, WEBSOCKET_EVENTS } from 'src/utils/constants';
interface ActiveUsersProps {
  username: string;
  className?: string;
}

type User = {
  [key: string]: {
    username: string;
    isDrawing: boolean;
  };
};

type UsersListType = {
  type: string;
  data: User;
};

export const Users = ({ username, className }: ActiveUsersProps) => {
  const [usersList, setUsersList] = useState<User>({});
  const { lastJsonMessage } = useWebSocket<UsersListType>(SOCKET_URL, {
    queryParams: { username },
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
        ' min-w-[140] rounded-b-lg border-t-2 border-gray-200 bg-[#fcfcfc] md:rounded-bl-lg md:rounded-br-none md:rounded-tl-lg md:border-r-2  md:border-t-0 lg:min-w-60 lg:max-w-80',
        className
      )}
    >
      <h2 className='-mb--space-3xs max-h-[10%] -p--space-s -text--step--1 font-bold tracking-widest'>
        Connected users
      </h2>
      <div className='flex max-h-[40%] flex-1 gap-1 overflow-x-auto md:flex-col'>
        {Object.keys(usersList).length > 0
          ? Object?.keys(usersList)?.map((uuid, index) => {
              const { username } = usersList[uuid];

              return (
                <div
                  className={clsx(
                    'flex items-center gap-2 -p--space-2xs',
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
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
