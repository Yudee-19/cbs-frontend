import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import type { EquipmentData } from "@/services/assets/EquipmentServices";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  item: EquipmentData | null;
  onClose: () => void;
}

const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "-");
const fmtDateTime = (iso?: string) => (iso ? new Date(iso).toLocaleString() : "-");

export const EquipmentDetailsDrawer: React.FC<Props> = ({ open, item, onClose }) => {
  return (
    <Drawer open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DrawerContent>
        <div className="relative flex flex-col h-full">
          <DrawerHeader>
            <div className="flex items-start justify-between w-full">
              <DrawerTitle>{item ? item.equipmentName : "Equipment Details"}</DrawerTitle>
              <DrawerClose asChild>
                <button aria-label="Close" className="inline-flex items-center justify-center p-1 rounded hover:bg-muted/10">
                  <X className="h-4 w-4" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-auto p-6 pb-24">
            {item ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Category</div>
                  <div className="font-medium">{item.category ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Manufacturer</div>
                  <div className="font-medium">{item.manufacturer ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Model</div>
                  <div className="font-medium">{item.equipmentModel ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Serial Number</div>
                  <div className="font-medium">{item.serialNumber ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Condition</div>
                  <div className="font-medium">{item.condition ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Location</div>
                  <div className="font-medium">{item.location ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Purchase Date</div>
                  <div className="font-medium">{fmtDate(item.purchaseDate)}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Purchase Value</div>
                  <div className="font-medium">{item.purchaseValue ?? "-"} {item.purchaseCurrency ?? ""}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Current Value</div>
                  <div className="font-medium">{item.currentValue ?? "-"} {item.currentCurrency ?? ""}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Warranty Expiry</div>
                  <div className="font-medium">{fmtDate(item.warrantyExpiry)}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Last Maintenance</div>
                  <div className="font-medium">{fmtDateTime(item.lastMaintenanceDate)}</div>
                </div>

                <div className="col-span-2">
                  <div className="text-muted-foreground">Technical Specifications</div>
                  <div className="font-medium">{item.technicalSpecifications ?? "-"}</div>
                </div>

                {/* <div className="col-span-2">
                  <div className="text-muted-foreground">Notes</div>
                  <div className="font-medium">{item.status ? `${item.status} • Updated: ${fmtDateTime(item.updatedAt)}` : item.notes ?? "-"}</div>
                </div> */}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No equipment selected</div>
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