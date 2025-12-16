import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import type { SupportTicketData } from "@/services/itServices/SupportServices";

interface Props {
  open: boolean;
  item: SupportTicketData | null;
  onClose: () => void;
}

const formatDateTime = (iso?: string) => (iso ? new Date(iso).toLocaleString() : "-");

const ItSupportDetailsDrawer: React.FC<Props> = ({ open, item, onClose }) => {
  return (
    <Drawer open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DrawerContent>
        <div className="relative flex flex-col h-full">
          <DrawerHeader>
            <div className="flex items-start justify-between w-full">
              <DrawerTitle>{`Ticket: ${item?.ticketTitle ?? ""}`}</DrawerTitle>
              <DrawerClose asChild>
                <button aria-label="Close" className="inline-flex items-center justify-center p-1 rounded hover:bg-muted/10 cursor-pointer">
                  <span className="sr-only">Close</span>
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-auto p-6 pb-24">
            {item ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries({
                  Title: item.ticketTitle,
                  Category: item.category,
                  Priority: item.priority,
                  Department: item.department,
                  AssignedTo: item.assignTo,
                  SubmittedBy: item.submittedBy,
                  Status: item.status,
                  Description: item.description,
                  Created: item.createdAt ? formatDateTime(item.createdAt) : "-",
                  Updated: item.updatedAt ? formatDateTime(item.updatedAt) : "-",
                }).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-muted-foreground">{k}</div>
                    <div className="font-medium">{String(v ?? "-")}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No ticket selected</div>
            )}
          </div>

          <div className="border-t bg-white sticky bottom-0 z-20 px-2 py-3 flex justify-end">
            <DrawerClose asChild>
              <Button type="button" size="sm" variant="secondary">Close</Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ItSupportDetailsDrawer;