import { useState } from 'react';

export function useWebSocket(url: string, clientId?: string) {
  const [data, setData] = useState<string | null>(null);

  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connection established');
    if (clientId) {
      ws.send(JSON.stringify({ type: 'register', clientId }));
    }
  };

  const recieveMessage = () => {
    setInterval(() => {
      ws.onmessage = event => {
        setData(event.data.toString());
      };
    }, 1000);

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };
  };

  const closeConnection = () => {
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };
  return {
    data,
    recieveMessage,
    closeConnection,
  };
}
