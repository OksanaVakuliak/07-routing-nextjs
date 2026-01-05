'use client';

interface FilterErrorProps {
  error: Error;
}

export default function FilterError({ error }: FilterErrorProps) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}
