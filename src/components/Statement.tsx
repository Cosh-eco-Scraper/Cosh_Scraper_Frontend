interface StatementProps {
  stateMent?: string;
}

export default function Statement(props: StatementProps) {
  return (
    <p className="mt-4 text-center font-medium text-green-600">
      {props.stateMent}
    </p>
  );
}
