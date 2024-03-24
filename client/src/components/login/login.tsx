import { SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

interface LoginProps {
  setUsername: React.Dispatch<SetStateAction<string>>;
}

export const Login = ({ setUsername }: LoginProps) => {
  const [disabled, setDisabled] = useState(true);

  const handleJoin = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: {
        value: string;
      };
    };

    const username = target.username.value;

    if (target.username.value.length > 12) {
      toast.error('Please use a shorter username.');
      return;
    }

    setUsername(username);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-white'>
      <h2 className='font-gluten -mb--space-xs -text--step-1 font-bold'>
        Welcome back!
      </h2>
      <div className='flex flex-col rounded-lg bg-white -px--space-m -py--space-s text-black'>
        <h3 className=' -mb--space-3xs -text--step-0 font-semibold'>
          Join board
        </h3>
        <form className='flex flex-col' onSubmit={handleJoin}>
          <label
            htmlFor='username'
            className='-mb--space-3xs -text--step--2 font-semibold'
          >
            Username
          </label>
          <input
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
            Join board
          </button>
        </form>
      </div>
    </div>
  );
};
