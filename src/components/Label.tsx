interface Label {
  label: string;
}

export default function Label({ label }: Label) {
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs text-black shadow ${
        label === 'A'
          ? 'bg-[#3aff82]'
          : label === 'B'
            ? 'bg-[#ffcc00]'
            : label === 'C'
              ? 'bg-[#ff8800]'
              : null
      }`}
    >
      {label}
    </span>
  );
}
