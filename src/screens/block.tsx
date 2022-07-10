import React from "react";
import { Link, useParams } from "react-router-dom";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import {
  convertTimestampToTimeFromNow,
  formatDate,
} from "../utils/convertTimestampToTimeFromNow";
import { useBlock } from "../hooks/useBlock";
import { useExtrinsics } from "../hooks/useExtrinsics";
import ExtrinsicsTable from "../components/extrinsics/ExtrinsicsTable";
import ResultLayout from "../components/ResultLayout";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import InfoTable from "../components/InfoTable";

function BlockPage() {
  let { id } = useParams();

  const [block, { loading }] = useBlock({ id_eq: id }, { skip: !id });

  const extrinsics = useExtrinsics({ block: { id_eq: id } }, "id_DESC", {
    skip: !id,
  });

  return (
    <ResultLayout>
      <div className="calamar-card">
        <div className="calamar-table-header" style={{ paddingBottom: 48 }}>
          Block #{id}
        </div>
        <InfoTable
          item={block}
          loading={loading}
          noItemMessage="No block found"
        >
          {block && (
            <TableBody>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{block.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hash</TableCell>
                <TableCell>
                  {block.hash}
                  <span style={{ marginLeft: 8 }}>
                    <CopyToClipboardButton value={block.hash} />
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Parent hash</TableCell>
                <TableCell>
                  <Link to={`/search?query=${block.parentHash}`}>
                    {block.parentHash}
                  </Link>
                  <span style={{ marginLeft: 8 }}>
                    <CopyToClipboardButton value={block.parentHash} />
                  </span>
                </TableCell>
              </TableRow>
              {block.validator && (
                <TableRow>
                  <TableCell>Validator</TableCell>
                  <TableCell>
                    {block.validator}
                    <span style={{ marginLeft: 8 }}>
                      <CopyToClipboardButton value={block.validator} />
                    </span>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>Block height</TableCell>
                <TableCell>{block.height}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>
                  <Tooltip
                    arrow
                    placement="top"
                    title={formatDate(block.timestamp)}
                  >
                    <span>
                      {convertTimestampToTimeFromNow(block.timestamp)}
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </InfoTable>
      </div>
      {block && (
        <div
          className="calamar-card"
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          <div className="calamar-table-header" style={{ paddingBottom: 48 }}>
            Extrinsics
          </div>
          <ExtrinsicsTable
            items={extrinsics.items}
            loading={extrinsics.loading}
            pagination={extrinsics.pagination}
          />
        </div>
      )}
    </ResultLayout>
  );
}

export default BlockPage;
