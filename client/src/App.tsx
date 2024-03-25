import { useState } from 'react';
import { Board, Container, Login } from 'src/components';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className='min-h-full bg-blue-600 bg-puzzles-pattern font-roboto-mono'>
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
