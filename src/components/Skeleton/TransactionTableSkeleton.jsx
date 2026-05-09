import Skeleton from "react-loading-skeleton";

const TransactionTableSkeleton = () => {
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
              Time
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Date
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Wallet
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
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="table-td" style={{ padding: "10px" }}>
                <Skeleton width={50} />
              </td>
              <td className="table-td" style={{ padding: "10px" }}>
                <Skeleton width={50} />
              </td>
              <td className="table-td" style={{ padding: "10px" }}>
                <Skeleton width={60} />
              </td>
              <td className="table-td" style={{ padding: "10px" }}>
                <Skeleton />
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                <Skeleton width={50} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTableSkeleton;
