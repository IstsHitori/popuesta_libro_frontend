import { useDraggable } from "@dnd-kit/core";
export default function Response() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 1,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      className="text-white"
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      Response-1
    </div>
  );
}
