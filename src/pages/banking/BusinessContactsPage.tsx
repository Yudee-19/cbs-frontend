import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BankAccountsTab from "./components/BankAccountsTab";
import PayeesTab from "./components/PayeesTab";
import { BankAccountFormDialog } from "./components/BankAccountFormDialog";
import { PayeeFormDialog } from "./components/PayeeFormDialog";
import {
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  getBankAccount,
  type BankAccountData,
} from "@/services/banking/BankAccountServices";
import {
  createPayee,
  updatePayee,
  deletePayee,
  getPayee,
  type PayeeData,
} from "@/services/banking/PayeeServices";

const BusinessContactsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("banks");

  // Bank Account Dialog State
  const [bankDialogOpen, setBankDialogOpen] = useState(false);
  const [bankDialogMode, setBankDialogMode] = useState<"add" | "edit">("add");
  const [bankForm, setBankForm] = useState<Partial<BankAccountData>>({
    currency: "USD",
  });
  const [bankSubmitting, setBankSubmitting] = useState(false);

  // Payee Dialog State
  const [payeeDialogOpen, setPayeeDialogOpen] = useState(false);
  const [payeeDialogMode, setPayeeDialogMode] = useState<"add" | "edit">("add");
  const [payeeForm, setPayeeForm] = useState<Partial<PayeeData>>({});
  const [payeeSubmitting, setPayeeSubmitting] = useState(false);

  // Refs for refreshing tables
  const [refreshBankTrigger, setRefreshBankTrigger] = useState(0);
  const [refreshPayeeTrigger, setRefreshPayeeTrigger] = useState(0);

  const handleBack = () => {
    navigate("/banking/cheque-printing");
  };

  const handleAddBank = () => {
    setBankForm({ currency: "USD" });
    setBankDialogMode("add");
    setBankDialogOpen(true);
  };

  const handleEditBank = async (bank: BankAccountData) => {
    try {
      // Fetch full bank account details by ID
      const fullBankData = await getBankAccount(bank._id || bank.id || "");
      setBankForm(fullBankData);
      setBankDialogMode("edit");
      setBankDialogOpen(true);
    } catch (e: any) {
      toast.error("Failed to load bank account details", {
        description: e?.message ?? "",
      });
    }
  };

  const handleDeleteBank = async (bank: BankAccountData) => {
    if (!confirm(`Are you sure you want to delete "${bank.bankName}"?`)) {
      return;
    }

    try {
      await deleteBankAccount(bank._id || bank.id || "");
      toast.success("Bank account deleted successfully");
      setRefreshBankTrigger((prev) => prev + 1);
    } catch (e: any) {
      toast.error("Failed to delete bank account", {
        description: e?.message ?? "",
      });
    }
  };

  const handleAddPayee = () => {
    setPayeeForm({});
    setPayeeDialogMode("add");
    setPayeeDialogOpen(true);
  };

  const handleEditPayee = async (payee: PayeeData) => {
    try {
      // Fetch full payee details by ID
      const fullPayeeData = await getPayee(payee._id || payee.id || "");
      setPayeeForm(fullPayeeData);
      setPayeeDialogMode("edit");
      setPayeeDialogOpen(true);
    } catch (e: any) {
      toast.error("Failed to load payee details", {
        description: e?.message ?? "",
      });
    }
  };

  const handleDeletePayee = async (payee: PayeeData) => {
    if (!confirm(`Are you sure you want to delete "${payee.name}"?`)) {
      return;
    }

    try {
      await deletePayee(payee._id || payee.id || "");
      toast.success("Payee deleted successfully");
      setRefreshPayeeTrigger((prev) => prev + 1);
    } catch (e: any) {
      toast.error("Failed to delete payee", {
        description: e?.message ?? "",
      });
    }
  };

  const handleBankSubmit = async () => {
    try {
      setBankSubmitting(true);
      
      if (bankDialogMode === "add") {
        await createBankAccount(
          bankForm as Omit<BankAccountData, "_id" | "id" | "createdAt" | "updatedAt">
        );
        toast.success("Bank account added successfully");
      } else {
        const id = bankForm._id || bankForm.id || "";
        await updateBankAccount(id, bankForm);
        toast.success("Bank account updated successfully");
      }
      
      setBankDialogOpen(false);
      setBankForm({ currency: "USD" });
      setRefreshBankTrigger((prev) => prev + 1);
    } catch (e: any) {
      toast.error(
        `Failed to ${bankDialogMode === "add" ? "add" : "update"} bank account`,
        {
          description: e?.message ?? "",
        }
      );
    } finally {
      setBankSubmitting(false);
    }
  };

  const handlePayeeSubmit = async () => {
    try {
      setPayeeSubmitting(true);
      
      if (payeeDialogMode === "add") {
        await createPayee(
          payeeForm as Omit<PayeeData, "_id" | "id" | "createdAt" | "updatedAt">
        );
        toast.success("Payee added successfully");
      } else {
        const id = payeeForm._id || payeeForm.id || "";
        await updatePayee(id, payeeForm);
        toast.success("Payee updated successfully");
      }
      
      setPayeeDialogOpen(false);
      setPayeeForm({});
      setRefreshPayeeTrigger((prev) => prev + 1);
    } catch (e: any) {
      toast.error(
        `Failed to ${payeeDialogMode === "add" ? "add" : "update"} payee`,
        {
          description: e?.message ?? "",
        }
      );
    } finally {
      setPayeeSubmitting(false);
    }
  };

  const handleBankClose = () => {
    if (!bankSubmitting) {
      setBankDialogOpen(false);
      setBankForm({ currency: "USD" });
    }
  };

  const handlePayeeClose = () => {
    if (!payeeSubmitting) {
      setPayeeDialogOpen(false);
      setPayeeForm({});
    }
  };

  return (
    <div className="p-2 sm:p-4 h-full flex flex-col">
      <Card className="shadow-sm flex flex-col h-full bg-white overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <div className="flex items-center justify-between px-2 sm:px-4 pt-4 mb-4">
            <TabsList>
              <TabsTrigger value="banks" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Banks
              </TabsTrigger>
              <TabsTrigger value="payees" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Payees
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back To Banking</span>
                <span className="sm:hidden">Back</span>
              </Button>
              {activeTab === "banks" ? (
                <Button
                  size="sm"
                  variant="default"
                  className="h-8 px-3 flex items-center gap-2"
                  onClick={handleAddBank}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Bank Account</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="default"
                  className="h-8 px-3 flex items-center gap-2"
                  onClick={handleAddPayee}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Payee</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              )}
            </div>
          </div>

          <CardContent className="flex-1 overflow-hidden px-2 sm:px-4">
            <TabsContent value="banks" className="flex-1 overflow-hidden">
              <BankAccountsTab
                key={refreshBankTrigger}
                onEdit={handleEditBank}
                onDelete={handleDeleteBank}
              />
            </TabsContent>

            <TabsContent value="payees" className="flex-1 overflow-hidden">
              <PayeesTab
                key={refreshPayeeTrigger}
                onEdit={handleEditPayee}
                onDelete={handleDeletePayee}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Bank Account Dialog */}
      <BankAccountFormDialog
        open={bankDialogOpen}
        mode={bankDialogMode}
        form={bankForm}
        onChange={(patch) => setBankForm({ ...bankForm, ...patch })}
        onSubmit={handleBankSubmit}
        onClose={handleBankClose}
        submitting={bankSubmitting}
      />

      {/* Payee Dialog */}
      <PayeeFormDialog
        open={payeeDialogOpen}
        mode={payeeDialogMode}
        form={payeeForm}
        onChange={(patch) => setPayeeForm({ ...payeeForm, ...patch })}
        onSubmit={handlePayeeSubmit}
        onClose={handlePayeeClose}
        submitting={payeeSubmitting}
      />
    </div>
  );
};

export default BusinessContactsPage;
