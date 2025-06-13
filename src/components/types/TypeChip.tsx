import React from "react";

interface TypeChipProps {
    id: number;
    name: string;
    onRemove: (id: number) => void;
}

export default function TypeChip({name, id,onRemove}: TypeChipProps) {
    return (<span
        className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow"
    >
            {name}
        <button
            onClick={() => onRemove(id)}
            className="ml-1 rounded-full hover:bg-white/20"
        >
              ✕
            </button>
          </span>)
}