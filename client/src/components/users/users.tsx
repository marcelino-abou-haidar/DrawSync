import Avvvatars from 'avvvatars-react';

type lastJsonMessageType = {
  [key: string]: {
    username: string;
    cursorState: {
      x: number;
      y: number;
    };
  };
};

interface ActiveUsersProps {
  lastJsonMessage: lastJsonMessageType;
}

export const Users = ({ lastJsonMessage }: ActiveUsersProps) => {
  /*  if (!lastJsonMessage || Object.keys(lastJsonMessage).length === 0) {
    return null;
  }
 */
  return (
    <div className='bg-slate-500 p-4'>
      <h2 className='mb-2 font-bold tracking-widest'>Connected users</h2>
      <div className='flex gap-2 overflow-x-auto p-2'>
        {/* {Object?.keys(lastJsonMessage)?.length > 0
          ? Object?.keys(lastJsonMessage)?.map((userId) => {
              const { username } = lastJsonMessage[userId];

              return (
                <div className='inline-block' key={userId}>
                  <a
                    data-tooltip-id='tooltip'
                    data-tooltip-content={username}
                    data-tooltip-place='top'
                  >
                    <Avvvatars
                      border={true}
                      borderColor='darkgray'
                      value={username}
                      radius={4}
                    />
                  </a>
                </div>
              );
            })
          : null} */}
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
        <div className='inline-block'>
          <a
            data-tooltip-id='tooltip'
            data-tooltip-content={'username'}
            data-tooltip-place='top'
          >
            <Avvvatars
              border={true}
              borderColor='darkgray'
              value={'username'}
              radius={4}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
