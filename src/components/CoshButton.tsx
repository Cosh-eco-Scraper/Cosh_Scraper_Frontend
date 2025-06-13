import { ReactNode } from 'react';

interface CoshButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function CoshButton({ onClick, children }: CoshButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inter-medium mb-2 rounded-full bg-[#6C4CFF] px-10 py-3 text-lg font-semibold text-white transition hover:bg-[#8B75FF]"
    >
      {children}
    </button>
  );
}
