import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface ActionButtonWithTooltipProps {
  icon: ReactNode;
  tooltip: string;
  onClick?: () => void;
  colorClass?: string;
  disabled?: boolean;
}

export const ActionButtonWithTooltip = ({
  icon,
  tooltip,
  onClick,
  colorClass = '',
  disabled = false,
}: ActionButtonWithTooltipProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* wrap inside a span because disabled buttons don’t trigger tooltip */}
          <span
            className={
              disabled ? 'cursor-not-allowed inline-flex' : 'inline-flex'
            }
          >
            <Button
              variant="ghost"
              size="sm"
              className={colorClass}
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              disabled={disabled}
            >
              {icon}
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {disabled
              ? `Role is not ${tooltip === 'Delete Role' ? 'deletable' : 'Editable'}`
              : tooltip}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
