import Skeleton from "react-loading-skeleton";
import Userprofile from "../../../assets/images/userprofile.png";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
import { DeleteIcon } from "../../../components/Icons/Icons";
import { useGetAllUsers } from "../../../hooks/useAuth";

const UsersListing = () => {
  const { data, isLoading } = useGetAllUsers();

  return (
    <div className="container-fluid main-container">
      <h2 className="main-title-09888 pt-4">Users</h2>
      <div className="tablebggg mt-4" style={{ overflowX: "auto" }}>
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
                User ID
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                User Name
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                Email
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                Phone No
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                Address
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "right", padding: "10px" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user, index) => (
              <tr key={index}>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton width={50} /> : user._id}
                </td>
                <td
                  className="table-td d-flex align-items-center"
                  style={{ padding: "10px" }}
                >
                  <img
                    className="mr-2"
                    height="32px"
                    width="32px"
                    src={Userprofile}
                  />
                  <div>
                    {isLoading ? <Skeleton width={50} /> : user.fullName || "-"}
                  </div>
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton width={60} /> : user.email || "-"}
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton /> : user.phoneNumber || "-"}
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton /> : user.addrerss || "-"}
                </td>
                <td style={{ padding: "10px", textAlign: "right" }}>
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListing;
