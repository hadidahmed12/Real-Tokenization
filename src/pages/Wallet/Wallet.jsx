import {
  CardVeIcon,
  CardVeIconssss,
  DeleteIcon,
  ExplanationIcon,
  StartIconss,
} from "../../components/Icons/Icons";
import TransactionTable from "../../components/TransactionTable";
import { Link } from "react-router-dom";
import {
  useGetAllCards,
  useGetAllBank,
  useDeleteBank,
  useDeleteCard,
  useGetWalletBalance,
} from "../../hooks/useWallet.js";
import { browserRoutes } from "../../routes/browserRoutes.js";
import DirectDepositModal from "../../components/Modals/DirectDepositModal.jsx";
import {
  setDirectDeposit,
  setDirectWithdraw,
} from "../../store/slices/depositWithdraw.js";
import { useDispatch, useSelector } from "react-redux";
import DirectWithrawCrptoModal from "../../components/Modals/DirectWithdrawModal.jsx";
import "./wallet.css";

const Wallet = () => {
  const { data: cardsData } = useGetAllCards();
  const dispatch = useDispatch();

  const { data: walletBalance, isLoading } = useGetWalletBalance();

  const { data } = useGetAllBank();
  const { mutate } = useDeleteBank();
  const { mutate: cardMutate } = useDeleteCard();

  const { directDeposit, directWithdraw } = useSelector(
    (state) => state.directModal
  );

  const walletAddress = useSelector(
    (state) => state.user.user?.data?.wallet?.walletAddress
  );

  console.log("walletAddress", walletAddress);

  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-4">Wallet</h2>
      </div>
      <div className="row">
        <div className="col-xl-6 mt-3">
          <div className="wallet-top-card">
            <div className="d-flex justify-content-between align-items-center">
              <h6>Cash Balance</h6>
              <button onClick={() => dispatch(setDirectDeposit(true))}>
                Deposit
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h5>USDT {isLoading ? "..." : walletBalance?.data || 0}</h5>
              <button
                style={{ color: "#514746", backgroundColor: "#fff" }}
                onClick={() => dispatch(setDirectWithdraw(true))}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-6 mt-3">
          <div className="wallet-top-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>
                  Reward Balance
                  <span className="ml-2">
                    <ExplanationIcon />
                  </span>
                </h6>
                <h5 className="pt-4">USDT 40</h5>
              </div>
              <div>
                <StartIconss />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="wallter-sub-heading pb-3">Transactions</h4>
        <TransactionTable />
      </div>

      <div className="row mt-4">
        <div className="col-xl-6">
          <h4 className="wallter-sub-heading pb-3">Cards</h4>
          <div className="walltet-sub-card">
            {cardsData?.data?.data?.length > 0 ? (
              cardsData?.data?.data?.map((card, index) => (
                <div
                  className="d-flex justify-content-between mt-2"
                  key={index}
                >
                  <div className="d-flex align-items-center">
                    <CardVeIcon />
                    <div className="card-number-wallet pl-3">
                      {card?.brand} .... {card?.last4}
                    </div>
                  </div>
                  <div onClick={() => cardMutate(card?.id)}>
                    <DeleteIcon style={{ cursor: "pointer" }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="nodata">No Card added yet.</p>
            )}

            <Link to={browserRoutes.ADD_CARD} className="no-style">
              <button className="walletbtn-0993 mt-3">+ Add New Card</button>
            </Link>
          </div>
        </div>
        <div className="col-xl-6">
          <h4 className="wallter-sub-heading pb-3">Banks</h4>
          <div className="walltet-sub-card">
            {data?.data?.data?.length > 0 ? (
              data?.data?.data?.map((bank, index) => (
                <div
                  className="d-flex justify-content-between mt-2"
                  key={index}
                >
                  <div className="d-flex align-items-center">
                    <CardVeIconssss />
                    <div className="card-number-wallet pl-3">
                      {bank.bankName} .... {bank?.iban.slice(-4)}
                    </div>
                  </div>
                  <div onClick={() => mutate(bank._id)}>
                    <DeleteIcon style={{ cursor: "pointer" }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="nodata">No banks added yet.</p>
            )}

            <Link to={"/wallet/add-bank"} className="no-style">
              <button className="walletbtn-0993 mt-3">+ Add New Bank</button>
            </Link>
          </div>
        </div>
      </div>
      {directDeposit && (
        <DirectDepositModal
          handleClose={() => dispatch(setDirectDeposit(false))}
          show={directDeposit}
          // details={{ address: "0x112751A40e19a0160618D006f6Cd6163530B6018" }}
          details={{ address: walletAddress }}
        />
      )}

      {directWithdraw && (
        <DirectWithrawCrptoModal
          handleClose={() => dispatch(setDirectWithdraw(false))}
          show={directWithdraw}
          withdrawDetails={{
            // address: "0x112751A40e19a0160618D006f6Cd6163530B6018",
            address: walletAddress,
            amount: walletBalance?.data,
            network: "polygon",
          }}
        />
      )}
    </div>
  );
};

export default Wallet;
