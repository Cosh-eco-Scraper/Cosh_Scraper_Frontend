import { ReactNode } from 'react';

interface CoshButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function CoshButton({ onClick, children }: CoshButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mb-2 rounded-full bg-[#6C4CFF] px-10 py-3 text-lg font-semibold text-white transition hover:bg-[#2F007B]"
    >
      {children}
    </button>
  );
}
