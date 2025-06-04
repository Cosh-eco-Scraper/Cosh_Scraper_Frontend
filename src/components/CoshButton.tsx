import { ReactNode } from 'react';

interface CoshButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function CoshButton({ onClick, children }: CoshButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#6C4CFF] hover:bg-[#2F007B] text-white font-semibold py-3 px-10 rounded-full text-lg transition mb-2"
    >
      {children}
    </button>
  );
}
