import { useState } from "react";
import NewTransferModal from "./components/NewTransferModal";
import TelexTransferTable from "./components/TelexTransferTable";
import TelexRecordView from "./components/TelexRecordView";
import { useTelexTransfers } from "./hooks/useTelexTransfers";

const TelexTransferPage = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const {
    transfers,
    selectedTransfer,
    isLoading,
    handleRowClick,
    handleTransferSuccess,
  } = useTelexTransfers();

  return (
    <div className="flex h-full bg-gray-50 gap-4">
      {/* Left Side - Table (60%) */}
      <TelexTransferTable
        transfers={transfers}
        onRowClick={handleRowClick}
        onNewTransfer={() => setShowNewModal(true)}
        isLoading={isLoading}
      />

      {/* Right Side - Details (40%) */}
      <TelexRecordView
        transfer={selectedTransfer}
        totalTransfers={transfers.length}
      />

      {/* New Transfer Modal */}
      {showNewModal && (
        <NewTransferModal
          open={showNewModal}
          onClose={() => setShowNewModal(false)}
          onSuccess={handleTransferSuccess}
        />
      )}
    </div>
  );
};

export default TelexTransferPage;
