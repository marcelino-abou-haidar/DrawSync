import { useState } from 'react';
import { Board, Container, Login } from 'src/components';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className='font-roboto-mono min-h-full bg-slate-700 bg-puzzles-pattern'>
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
