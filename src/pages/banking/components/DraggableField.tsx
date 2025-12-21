import { useDrag } from 'react-dnd';

interface DraggableFieldProps {
  id: string;
  text: string;
  position: { x: number; y: number };
}

const DraggableField = ({ id, text, position }: DraggableFieldProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CHEQUE_FIELD',
    item: { id, position },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        userSelect: 'none',
        zIndex: 10,
      }}
      className="text-black font-medium text-sm px-2 py-1 bg-transparent"
    >
      {text}
    </div>
  );
};

export default DraggableField;
