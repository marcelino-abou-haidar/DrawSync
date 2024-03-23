import { SetStateAction, useState } from 'react';

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

    setUsername(username);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-white'>
      <h2 className='-text--step-1 -mb--space-xs font-bold'>Welcome back!</h2>
      <div className='-py--space-s -px--space-m flex flex-col rounded-lg bg-white text-black'>
        <h3 className=' -mb--space-3xs -text--step-0 font-semibold'>
          Join board
        </h3>
        <form className='flex flex-col' onSubmit={handleJoin}>
          <label
            htmlFor='username'
            className='-text--step--2 -mb--space-3xs font-semibold'
          >
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter username'
            className='-mb--space-2xs -py--space-3xs -px--space-2xs -text--step--2 rounded-lg border'
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
            className='-text--step--2 -p--space-2xs  rounded-lg bg-slate-700 font-medium text-white hover:bg-slate-600 active:bg-slate-300 active:text-black disabled:bg-gray-300'
          >
            Join board
          </button>
        </form>
      </div>
    </div>
  );
};
