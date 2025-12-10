import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

interface TruncateTooltipProps {
  text: string; // text to show truncated
  maxWidth?: string; // optional max width (default: 220px)
}

const TruncateTooltip: React.FC<TruncateTooltipProps> = ({
  text,
  maxWidth = '220px',
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`block truncate cursor-pointer`}
            style={{ maxWidth }}
          >
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          avoidCollisions={false}
          className="bg-white border shadow-md rounded-lg p-2 text-gray-900 break-words whitespace-normal max-w-[90vw]"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncateTooltip;
