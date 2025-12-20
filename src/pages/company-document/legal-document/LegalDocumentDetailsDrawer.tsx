import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import type { LegalDoc } from "@/services/company-documents/LegalDocServices";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  item: LegalDoc | null;
  onClose: () => void;
}

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "-");
const formatDateTime = (iso?: string) => (iso ? new Date(iso).toLocaleString() : "-");

export const LegalDocumentDetailsDrawer: React.FC<Props> = ({ open, item, onClose }) => {
  return (
    <Drawer open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DrawerContent>
        <div className="relative flex flex-col h-full">
          <DrawerHeader>
            <div className="flex items-start justify-between w-full">
              <DrawerTitle>{`Document: ${item?.name ?? ""}`}</DrawerTitle>
              <DrawerClose asChild>
                <button aria-label="Close" className="inline-flex items-center justify-center p-1 rounded hover:bg-muted/10 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-auto p-6 pb-24">
            {item ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries({
                  Name: item.name,
                  Category: item.category,
                  "Document Date": formatDate(item.documentDate),
                  "Parties Involved": item.partiesInvolved,
                  "File Key": item.fileKey ?? "-",
                  Created: formatDateTime(item.createdAt),
                  Updated: formatDateTime(item.updatedAt),
                }).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-muted-foreground">{k}</div>
                    <div className="font-medium">{String(v ?? "-")}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No item selected</div>
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