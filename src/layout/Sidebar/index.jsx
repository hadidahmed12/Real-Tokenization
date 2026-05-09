import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/veloxique.png";
import {
  ActiveDashboardIcon,
  BuySellIcon,
  CloseIcon,
  InactiveDashboardIcon,
  KycIcon,
  PaymentIcon,
  TokenIcon,
  TradingComission,
  TransactionIcon,
  UsersIcon,
  WalletIcon,
} from "../../components/Icons/Icons";
import { NavLink } from "react-router-dom";
import { browserRoutes } from "../../routes/browserRoutes";
import { useDispatch, useSelector } from "react-redux";
import { hideSidebar } from "../../store/slices/sidebarSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const role = useSelector((state) => state.user.user.role);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const adminMenuItem = [
    {
      path: browserRoutes.PROPERTIES,
      name: "Properties",
      icon: <InactiveDashboardIcon />,
      activeIcon: <ActiveDashboardIcon />,
    },
    {
      path: browserRoutes.TOKEN,
      name: "Token",
      icon: <TokenIcon />,
      activeIcon: <TokenIcon />,
    },
    {
      path: browserRoutes.KYC,
      name: "KYC Status",
      icon: <KycIcon />,
      activeIcon: <KycIcon />,
    },
    {
      path: browserRoutes.USERS,
      name: "Users",
      icon: <UsersIcon />,
      activeIcon: <UsersIcon />,
    },
    {
      path: browserRoutes.PAYMENTS,
      name: "Payments",
      icon: <PaymentIcon />,
      activeIcon: <PaymentIcon />,
    },
  ];

  const userMenuItem = [
    {
      path: browserRoutes.DASHBOARD,
      name: "Properties",
      icon: <InactiveDashboardIcon />,
      activeIcon: <ActiveDashboardIcon />,
    },
    {
      path: browserRoutes.WALLET,
      name: "Wallet",
      icon: <BuySellIcon color={"#514746"} />,
      activeIcon: <BuySellIcon color={"#fff"} />,
    },
    {
      path: browserRoutes.PORTFOLIO,
      name: "Portfolio",
      icon: <WalletIcon color={"#514746"} />,
      activeIcon: <WalletIcon color={"#fff"} />,
    },
    {
      path: browserRoutes.REWARDS,
      name: "Reward",
      icon: <TransactionIcon color={"#514746"} />,
      activeIcon: <TransactionIcon color={"#fff"} />,
    },
    {
      path: browserRoutes.USER_KYC,
      name: "KYC",
      icon: <KycIcon />,
      activeIcon: <KycIcon />,
    },
    {
      path: browserRoutes.CART,
      name: "Cart",
      icon: <TradingComission color={"#514746"} />,
      activeIcon: <TradingComission color={"#fff"} />,
    },
  ];

  const menuItem = role === "admin" ? adminMenuItem : userMenuItem;
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="containerr">
      <div
        style={{ width: "290px" }}
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
      >
        <div className="top_section">
          <h1 style={{ display: "70px" }} className="logo">
            <img src={Logo} />
          </h1>
          <div
            className="hideIcon"
            onClick={() => dispatch(hideSidebar(false))}
          >
            <CloseIcon className="" />
          </div>
        </div>
        <hr className="solid mb-5 mx-4"></hr>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) => (isActive ? "link active" : "link")}
            onClick={item.name === "Logout" ? logout : ""}
          >
            {({ isActive }) => (
              <>
                <div className="icon">
                  {isActive ? item.activeIcon : item.icon}
                </div>
                <div style={{ display: "block" }} className="link_text">
                  {item.name}
                </div>
                {cart.length !== 0 && item.name === "Cart" && (
                  <div className="link_text  crtleng">{cart.length}</div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
