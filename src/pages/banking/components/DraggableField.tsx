import { useDrag } from 'react-dnd';

interface DraggableFieldProps {
  id: string;
  text: string;
  position: { x: number; y: number };
  isVertical?: boolean;
}

const DraggableField = ({ id, text, position, isVertical = false }: DraggableFieldProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CHEQUE_FIELD',
    item: { id, position, text, isVertical },
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
        writingMode: isVertical ? 'vertical-lr' : 'horizontal-tb',
      }}
      className="text-black font-medium text-sm px-2 py-1 bg-transparent"
    >
      {text}
    </div>
  );
};

export default DraggableField;
