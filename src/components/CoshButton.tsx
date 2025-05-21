import { ReactNode } from 'react';

interface CoshButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function CoshButton({ onClick, children }: CoshButtonProps) {
  return (
    <button
      onClick={onClick}
      className="font-inter h-[60px] w-fit rounded-[45px] bg-[#583AFF] p-3 font-medium text-[#FBF6F0] transition-shadow hover:shadow-lg"
    >
      {children}
    </button>
  );
}
