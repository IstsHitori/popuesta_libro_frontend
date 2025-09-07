import { useDroppable } from "@dnd-kit/core";

type DropResponsesProps = {
  status: string;
};

export default function DropResponses({ status }: DropResponsesProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div ref={setNodeRef} className="p-2 text-white border-1 border-dashed">
      Drop responses here - {status}
    </div>
  );
}
