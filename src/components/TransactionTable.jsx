import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetAllTransactions } from "../hooks/useWallet";
import TransactionTableSkeleton from "./Skeleton/TransactionTableSkeleton";
import { shortenAddress } from "../utils/wallets";
import { handleCopyCommon } from "../utils/copyClipboard";
import { transactionDateAndTime } from "../utils/date";
import { capitiliseFirstLetter } from "../utils/captiliseFirstLetter";
import Paginate from "./Pagination/Index";

const TransactionTable = () => {
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = useGetAllTransactions(skip);
  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  return (
    <div className="tablebggg" style={{ overflowX: "auto" }}>
      <table
        className="table-main"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Time | Date
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Hash
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Amount
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "right", padding: "10px" }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.length > 0 ? (
            data?.data?.map((transaction, index) => (
              <tr key={index}>
                <td className="table-td" style={{ padding: "10px" }}>
                  {transactionDateAndTime(transaction?.createdAt).formattedTime}{" "}
                  |{" "}
                  {transactionDateAndTime(transaction?.createdAt).formattedDate}{" "}
                </td>

                <td
                  className="table-td"
                  style={{ padding: "10px" }}
                  onClick={() =>
                    handleCopyCommon(
                      transaction.transactionHash,
                      "Transaction Hash, has been  "
                    )
                  }
                >
                  {shortenAddress(transaction.transactionHash)}
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {Number(transaction.amount)}
                </td>
                <td
                  style={{ padding: "10px" }}
                  className="d-flex justify-content-end"
                >
                  <p
                    className={
                      transaction.status === "withdraw"
                        ? "statuskycadmin"
                        : transaction.status === "deposit"
                        ? "statuskycpending"
                        : transaction.status === "purchase"
                        ? "statuskycpurchase"
                        : "statuskycclaim"
                    }
                  >
                    {capitiliseFirstLetter(transaction.status)}
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="nodata text-center p-3">
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data?.data?.length > 0 && (
        <div className="d-flex justify-content-end mt-3 mr-2">
          <Paginate setSkip={setSkip} data={data} skip={skip} limit={5} />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
