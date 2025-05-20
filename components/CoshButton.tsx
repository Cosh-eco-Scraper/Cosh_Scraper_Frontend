import {ReactNode} from "react";

interface CoshButtonProps {
    onClick: () => void;
    children: ReactNode
}

export default function CoshButton({onClick, children}: CoshButtonProps) {
    return (
        <button onClick={onClick}
                className="rounded-[45px] bg-[#583AFF] font-inter font-medium h-[60px] w-[180px] text-[#FBF6F0] hover:shadow-lg transition-shadow">
            {children}
        </button>
    )
}