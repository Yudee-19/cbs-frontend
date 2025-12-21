'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

const RadioButton = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item
        ref={ref}
        data-slot="radio-button"
        className={cn(
            'peer size-[14px] shrink-0 rounded-full transition-all cursor-pointer outline-none',
            'bg-[rgba(16,24,40,0.6)]',
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:bg-white data-[state=checked]:border-[3px] data-[state=checked]:border-blue-700',
            className
        )}
        {...props}
    />
));
RadioButton.displayName = 'RadioButton';

export { RadioButton };
