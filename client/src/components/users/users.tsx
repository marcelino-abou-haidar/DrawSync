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
        ' min-w-[140] rounded-b-lg bg-gray-300 -p--space-s md:rounded-bl-lg md:rounded-br-none  md:rounded-tl-lg lg:min-w-60 lg:max-w-80',
        className
      )}
    >
      <h2 className='-mb--space-3xs -text--step--1 font-bold tracking-widest'>
        Connected users
      </h2>
      <div className='flex gap-4 overflow-x-auto -py--space-2xs md:flex-col'>
        {Object.keys(usersList).length > 0
          ? Object?.keys(usersList)?.map((uuid) => {
              const { username } = usersList[uuid];

              return (
                <div className='flex items-center gap-2' key={uuid}>
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
