import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode; // form or any content
  footer: React.ReactNode; // custom footer buttons
  className?: string;
  maxWidth?: string;
}

export const CustomDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className = "",
  maxWidth = "max-w-2xl",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* layout as column: header (top), scrollable body (flex-1), footer (bottom) */}
      <DialogContent className={`${maxWidth} p-0 ${className} h-[80vh] flex flex-col rounded-lg`}>
        <DialogHeader className="z-30 bg-white/95 backdrop-blur-sm px-4 py-3 border-b">
          <div className="flex items-start justify-between w-full gap-4">
            <div>
              <DialogTitle className="text-base">{title}</DialogTitle>
              {description && <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>}
            </div>
            <DialogClose asChild>
              <button aria-label="Close" className="inline-flex items-center justify-center p-2 rounded hover:bg-muted/10">
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* scrollable area - occupies remaining space, single scrollbar */}
        <div className="px-4 py-4 overflow-auto flex-1">{children}</div>

        {/* footer fixed to bottom of dialog (outside scrollable area) */}
        <DialogFooter className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-t px-4 py-3 flex gap-3 justify-end items-center">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;