import { useState } from 'react';

export function useWebSocket(url: string) {
  const [data, setData] = useState<string | null>(null);

  const ws = new WebSocket(url);

  const recieveMessage = () => {
    setInterval(() => {
      ws.onmessage = event => {
        setData(event.data);
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
