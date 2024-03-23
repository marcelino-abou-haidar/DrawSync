import { useState } from 'react';
import { Board, Container, Login } from 'src/components';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className='min-h-full bg-slate-700 bg-puzzles-pattern text-white'>
      <Container>
        {username ? (
          <Board username={username} />
        ) : (
          <Login setUsername={setUsername} />
        )}
      </Container>
    </div>
  );
}

export default App;
