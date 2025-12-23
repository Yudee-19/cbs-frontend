import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import BankAccountsTab from "./components/BankAccountsTab";
import PayeesTab from "./components/PayeesTab";

const BusinessContactsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("banks");

  const handleBack = () => {
    navigate("/banking/cheque-printing");
  };

  const handleAddBank = () => {
    console.log("Add new bank account");
    // TODO: Implement add
  };

  const handleAddPayee = () => {
    console.log("Add new payee");
    // TODO: Implement add
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
              <BankAccountsTab />
            </TabsContent>

            <TabsContent value="payees" className="flex-1 overflow-hidden">
              <PayeesTab />
            </TabsContent>
          </CardContent>
        </Tabs>

      </Card>
    </div>
  );
};

export default BusinessContactsPage;
