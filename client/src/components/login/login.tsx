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
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h2 className='mb-4 text-3xl font-bold'>Welcome back!</h2>
      <div className='flex flex-col rounded bg-white p-6 text-black'>
        <h3 className='mb-2 text-xl font-semibold'>Join board</h3>
        <form className='flex flex-col' onSubmit={handleJoin}>
          <label htmlFor='username' className='mb-2 font-semibold'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter username'
            className='mb-2 rounded border px-4 py-2'
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
            className='bg-slate-700 px-4 py-2 text-lg font-medium text-white hover:bg-slate-600 active:bg-slate-300 active:text-black disabled:bg-gray-300'
          >
            Join board
          </button>
        </form>
      </div>
    </div>
  );
};
