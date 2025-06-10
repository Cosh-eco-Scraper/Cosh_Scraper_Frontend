import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage = (event) => {
            setData(event.data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, [url]);

    return data;
}