'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipProvider = ({
  children,
  delayDuration = 200,
}: {
  children: React.ReactNode;
  delayDuration?: number;
}) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    {children}
  </TooltipPrimitive.Provider>
);

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent(
  {
    className,
    side = 'bottom', //  default bottom
    align = 'center',
    sideOffset = 6,
    avoidCollisions = false, //  don’t flip to top unless you override
    collisionPadding = 8,
    ...props
  },
  ref
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        className={`z-50 rounded-md bg-white px-3 py-1.5 text-xs text-gray-900 shadow-md border border-gray-200
                    animate-in fade-in-0 zoom-in-95 ${className || ''}`}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
