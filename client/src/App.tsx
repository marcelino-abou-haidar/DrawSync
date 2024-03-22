import { useState } from 'react';
import { Board, Login } from 'src/components';

function App() {
  const [username, setUsername] = useState('marcelino');

  return (
    <div className='h-full bg-slate-700 p-8 text-white'>
      {username ? (
        <Board username={username} />
      ) : (
        <Login setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
