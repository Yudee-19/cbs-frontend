import { useDrag } from 'react-dnd';
import type { DraggableFieldProps } from "../types/types";

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
      className="text-black font-medium text-xs px-2 py-1 bg-transparent"
    >
      {text}
    </div>
  );
};

export default DraggableField;
