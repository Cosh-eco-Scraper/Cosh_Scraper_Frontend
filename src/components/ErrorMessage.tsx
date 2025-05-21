import React from 'react';

interface ErrorMessageProps {
  error: Error | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (error) return <p>{error.message}</p>;
  return <p>An error occurred while loading data</p>;
}
