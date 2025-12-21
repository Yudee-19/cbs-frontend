declare module 'react-dnd' {
  import { ReactNode, ComponentType } from 'react';

  export interface DragSourceMonitor {
    isDragging(): boolean;
    getItem(): any;
  }

  export interface DropTargetMonitor {
    isOver(): boolean;
    canDrop(): boolean;
    getItem(): any;
  }

  export interface DndProviderProps {
    backend: any;
    children: ReactNode;
  }

  export function DndProvider(props: DndProviderProps): JSX.Element;

  export interface UseDragOptions {
    type: string;
    item: any;
    collect?: (monitor: DragSourceMonitor) => any;
  }

  export interface UseDropOptions {
    accept: string | string[];
    drop?: (item: any, monitor: DropTargetMonitor) => void;
    collect?: (monitor: DropTargetMonitor) => any;
  }

  export function useDrag(options: UseDragOptions): [any, any];
  export function useDrop(options: UseDropOptions): [any, any];
}

declare module 'react-dnd-html5-backend' {
  export const HTML5Backend: any;
}
