import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import type { VehicleData } from "@/services/assets/VehiclesServices";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  item: VehicleData | null;
  onClose: () => void;
}

const fmtDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "-");

export const VehicleDetailsDrawer: React.FC<Props> = ({ open, item, onClose }) => {
  return (
    <Drawer open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DrawerContent>
        <div className="relative flex flex-col h-full">
          <DrawerHeader>
            <div className="flex items-start justify-between w-full">
              <DrawerTitle>{item ? item.vehicleName : "Vehicle Details"}</DrawerTitle>
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
                  <div className="text-muted-foreground">Type</div>
                  <div className="font-medium">{item.vehicleType ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Plate</div>
                  <div className="font-medium">{item.plateNumber ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Year</div>
                  <div className="font-medium">{item.year ?? "-"}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Registration Expiry</div>
                  <div className="font-medium">{fmtDate(item.registrationExpiry)}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Purchase Date</div>
                  <div className="font-medium">{fmtDate(item.purchaseDate)}</div>
                </div>

                <div className="col-span-2">
                  <div className="text-muted-foreground">Notes</div>
                  <div className="font-medium">{item.notes ?? "-"}</div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No vehicle selected</div>
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