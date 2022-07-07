import React from "react";
import { useParams } from "react-router-dom";
import ExtrinsicsTable from "../components/extrinsics/ExtrinsicsTable";
import ResultLayout from "../components/ResultLayout";
import { useExtrinsics } from "../hooks/useExtrinsics";

function AccountPage() {
  let { address } = useParams();

  const extrinsics = useExtrinsics({
    signature_jsonContains: `{\\"address\\": \\"${address}\\"}`,
  });

  return (
    <ResultLayout>
      <div className="calamar-card">
        <div className="calamar-table-header" style={{ paddingBottom: 48 }}>
          Account #{address}
        </div>
        <div>TODO</div>
      </div>
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <ExtrinsicsTable
          columns={["id", "name", "time"]}
          items={extrinsics.items}
          pagination={extrinsics.pagination}
        />
      </div>
    </ResultLayout>
  );
}

export default AccountPage;
