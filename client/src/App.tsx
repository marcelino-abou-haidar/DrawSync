import useWebSocket from "react-use-websocket";

function App() {
  const SOCKET_URL = `${import.meta.env.VITE_BACKEND_SERVER_DOMAIN}:${import.meta.env.VITE_BACKEND_SERVER_PORT}`;

  const { sendJsonMessage, readyState } = useWebSocket(SOCKET_URL);

  console.log(readyState);

  return (
    <div className="h-full bg-slate-700 p-8 text-white">
      <h1 className="text-4xl font-bold">DrawSync</h1>
    </div>
  );
}

export default App;
